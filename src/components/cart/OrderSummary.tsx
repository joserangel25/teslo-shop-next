'use client'

import { useCartStore } from '@/store'
import { currencyFormatter } from '@/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  const { total, subTotal, tax, itemsInCart } = useCartStore(state => state.getSummaryInformation())

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded && !itemsInCart) {
      router.replace('/empty')
    }
  }, [itemsInCart, loaded, router])


  if (!loaded) return <p>Loading...</p>

  return (
    <div className="bg-white w-full md:w-auto rounded-xl shadow-xl p-7 self-start sticky top-5">
      <h2 className="text-2xl mb2">Resumen de la orden</h2>
      <div className="grid grid-cols-2">
        <span className="font-medium">No. de productos</span>
        <span className="text-right">{itemsInCart}</span>

        <span className="font-medium">Subtotal</span>
        <span className="text-right">{currencyFormatter(subTotal)}</span>

        <span className="font-medium">IVA (19%)</span>
        <span className="text-right">{currencyFormatter(tax)}</span>

        <span className="mt-5 text-xl font-medium">Total a pagar</span>
        <span className="mt-5 text-xl text-right">{currencyFormatter(total)}</span>
      </div>

      <Link className="btn-primary block text-center mt-2" href={'/checkout/address'}>Checkout</Link>
    </div>
  )
}
