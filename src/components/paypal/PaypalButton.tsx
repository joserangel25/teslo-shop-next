'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import type { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js'
import { paypalCheckPayment, updateTransactionIdInOrder } from '@/actions';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer()

  const roudendeAmount = (Math.round(amount * 100) / 100)

  if (isPending) {
    return (
      <div className='animate-pulse space-y-2'>
        <div className='h-9 bg-gray-300 rounded'></div>
        <div className='h-9 bg-gray-300 rounded'></div>
      </div>
    )
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: 'USD',
            value: roudendeAmount.toString(),
          },
        }
      ]
    })

    const { ok, message } = await updateTransactionIdInOrder(orderId, transactionId)

    if (!ok) {
      throw new Error(message ?? 'No se pudo actualizar el transactionId');
    }

    return transactionId
  }

  const onAppove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()
    if (!details) return;

    await paypalCheckPayment(details.id!)
  }

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onAppove}
    />
  )
}
