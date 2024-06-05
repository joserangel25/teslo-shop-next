'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/store'
import { currencyFormatter } from '@/utils'
import { Spinner } from '../ui'
import { Summary } from './Summary'

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


  if (!loaded) return <div className='w-full flex justify-center'> <Spinner /> </div>

  return (
    <Summary
      total={total}
      subTotal={subTotal}
      tax={tax}
      totalProducts={itemsInCart}
    />
  )
}
