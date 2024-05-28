'use server'

import { PaypalOrderResponse } from '@/interfaces'
import { setOrderPayed } from '../order/set-order-payed'
import { revalidatePath } from 'next/cache'

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const paypalToken = await getPaypalBearerToken()

  if (!paypalToken) {
    return {
      ok: false,
      message: 'No se pudo obtener Token de Pago.'
    }
  }

  const res = await verifyPaypalPayment(paypalTransactionId, paypalToken)

  if (!res) {
    return {
      ok: false,
      message: 'No se pudo verificar el pago.'
    }
  }

  const { purchase_units, status } = res

  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'No se realizó/terminó con éxito el pago en PayPal'
    }
  }

  const { invoice_id: orderId } = purchase_units[0]

  await setOrderPayed(orderId)

  revalidatePath(`/orders/${orderId}`)

}


const getPaypalBearerToken = async () => {
  const base64Token = Buffer.from(
    `${process.env.NEXT_PUBLIC_CLIENT_ID_PAYPAL}:${process.env.CLIENT_SECRET_PAYPAL}`,
    'utf-8'
  ).toString('base64')

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const res = await fetch(process.env.PAYPAL_OAUTH_URL ?? '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${base64Token}`
    },
    body: urlencoded
  })

  const token: { access_token: string } = await res.json()
  return token.access_token ? token.access_token : null
}

const verifyPaypalPayment = async (
  paypalTransactionId: string,
  paypalToken: string): Promise<PaypalOrderResponse | null> => {
  try {
    const res = await fetch(`${process.env.PAYPAL_ORDERS_URL ?? ''}/${paypalTransactionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${paypalToken}`
      }
    })

    return await res.json()
  } catch (error) {
    console.log(error)
    return null
  }
}