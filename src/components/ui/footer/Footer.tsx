import { fontTitle } from '@/config'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex gap-4 justify-center text-sm mb-10'>
      <Link href={'/'}>
        <span className={`${fontTitle.className} antialiased font-bold`}>Teslo</span>
        <span> | Shop</span>
        <span> {new Date().getFullYear()}</span>
      </Link>

      <Link href={'/'}>
        Privacidad & Legal
      </Link>

      <Link href={'/'}>
        Ubicaciones
      </Link>
    </div>
  )
}
