'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'
import { useCartStore } from '@/store'

export const CartLink = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  const totalProducts = useCartStore(state => state.getTotalProducts())
  return (
    <Link href={(totalProducts ? '/cart' : '/empty')}>
      <div className='relative'>
        {
          (loaded && totalProducts > 0) && (
            <span
              className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'
            >{totalProducts}</span>
          )
        }
        <IoCartOutline className='w-5 h-5' />
      </div>
    </Link>
  )
}
