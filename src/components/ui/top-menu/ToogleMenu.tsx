'use client'

import { useUIStore } from "@/store"

export const ToogleMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu)
  return (
    <button
      className='p-2 rounded-md transition-all hover:bg-gray-100'
      onClick={openSideMenu}
    >
      Menú
    </button>
  )
}
