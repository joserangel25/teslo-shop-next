'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useAddressStore, useCartStore } from '@/store'
import { OrderSummary } from '../cart'
import { AddressOrder } from './AddressOrder'
import { Spinner } from '../ui'
import { placeOrder } from '@/actions'
import { useRouter } from 'next/navigation'

export const WrappedCheckoutSummary = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [isSendingOrder, setIsSendingOrder] = useState(false)
  const [orderSended, setOrderSended] = useState(false)

  const router = useRouter()

  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearStore)
  const address = useAddressStore(state => state.getAddress())

  const onSendingOrder = async () => {
    setIsSendingOrder(true)

    const productToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))
    const { ok, message, order } = await placeOrder(productToOrder, address)

    if (!ok) {
      setIsSendingOrder(false)
      setErrorMessage(message)
      return
    }

    setIsSendingOrder(false)
    setOrderSended(true)
    router.replace(`/orders/${order!.id}`)
  }

  useEffect(() => {
    setLoaded(true)
  }, [])


  useEffect(() => {

    return () => {
      if (orderSended) {
        clearCart()
      }
    }
  }, [orderSended, clearCart])

  useEffect(() => {
    if (!cart.length && loaded) {
      router.replace('/')
    }
  }, [cart, router, loaded])


  return (
    <div
      className="bg-white flex flex-col  w-full md:w-[346px] rounded-xl shadow-xl p-7 self-start sticky top-5"
    >
      {
        cart.length ? (
          <>
            <AddressOrder />

            <div className="h-0.5 bg-slate-200 my-4 rounded-md" />

            <OrderSummary />

            <p className="text-sm max-w-72 my-3 text-center">
              Al hacer clic en {"'"}Generar orden{"'"} aceptas nuestros{" "}
              <span className="underline font-semibold">términos y condiciones.</span>
            </p>

            {
              errorMessage && (
                <span
                  className='fade-in block text-sm font-medium text-center text-white bg-red-500 px-2 py-1 rounded-lg w-full'
                >{errorMessage}</span>
              )
            }

            <button
              className={
                clsx(
                  'flex justify-center w-full text-center mt-2',
                  {
                    'btn-primary': !isSendingOrder,
                    'btn-disabled': isSendingOrder
                  }
                )
              }
              onClick={onSendingOrder}
              disabled={isSendingOrder}
            // href={'/orders/123'}
            >
              {isSendingOrder ? <div className='flex items-center gap-3 text-center mx-auto'><Spinner /> Generando...</div> : 'Generar Orden'}
            </button>
          </>
        ) : (
          <div className='self-center'>
            <Spinner />

          </div>
        )
      }
    </div>
  )
}
