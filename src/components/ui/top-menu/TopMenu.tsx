import Link from 'next/link'
import { fontTitle } from '@/config'
import { IoSearchOutline } from 'react-icons/io5'
import { ToogleMenu } from './ToogleMenu'
import { CartLink } from './CartLink'

export const TopMenu = () => {
  return (
    <nav className='flex px-5 lg:px-0 md:py-5 justify-between items-center w-full'>
      <div className=''>
        <Link
          href={'/'}
        >
          <span className={`${fontTitle.className} antialiased font-bold md:text-3xl`}>Teslo</span>
          <span className='md:text-xl'> | Shop</span>
        </Link>
      </div>

      <div className='hidden sm:block'>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href={'/gender/men'}
        >Hombres</Link>

        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href={'/gender/women'}
        >Mujeres</Link>

        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href={'/gender/kid'}
        >Niños</Link>
      </div>

      <div className='flex items-center gap-2'>
        <Link href={'/'}>
          <IoSearchOutline className='w-5 h-5' />
        </Link>

        <CartLink />

        <ToogleMenu />
      </div>
    </nav>
  )
}
