import Link from 'next/link'
import { fontTitle } from '@/config'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import { ToogleMenu } from './ToogleMenu'

export const TopMenu = () => {
  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      <div className=''>
        <Link
          href={'/'}
        >
          <span className={`${fontTitle.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
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
        <Link href={'/search'}>
          <IoSearchOutline className='w-5 h-5' />
        </Link>

        <Link href={'/cart'}>
          <div className='relative'>
            <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>3</span>
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>

        <ToogleMenu />
      </div>
    </nav>
  )
}
