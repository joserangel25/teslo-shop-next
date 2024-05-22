'use client'

import { useAddressStore } from '@/store'
import { useState, useEffect } from 'react'


export const AddressOrder = () => {

  const [loaded, setLoaded] = useState(false)
  const address = useAddressStore(state => state.getAddress())

  useEffect(() => {

    setLoaded(true)

  }, [])

  if (!loaded) return

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Dirección de entrega</h2>
      <div className="">
        <p className='capitalize'>{address.firstName} {address.firstName}</p>
        <p>{address.phone}</p>
        <p>{address.address}</p>
        <p>{address.city}, {address.country}</p>
      </div>
    </div>
  )
}
