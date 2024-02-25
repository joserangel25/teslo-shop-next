import { fontTitle } from '@/config'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row flex-grow w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5 ">
        <h2 className={`${fontTitle.className} antialiased text-9xl`}>404</h2>
        <p className='font-semibold text-xl'>Oopps, lo sentimos mucho.</p>
        <p className='font-light '>
          Puedes regresar al
          <Link
            href={'/'}
            className='font-normal hober:underline transition-all'
          > inicio</Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Foto de busqueda no exitosa"
          width={300}
          height={300}
        />
      </div>
    </div>
  )
}
