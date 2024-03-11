'use client'

import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'
import { SidebarMenuItem } from './SidebarMenuItem'
import { useUIStore } from '@/store'
import { MENU_ITEMS_ADMIN, MENU_ITEMS_CLIENTS } from '@/constants'
import { logOutSession } from '@/actions'
import { useEffect } from 'react'
import { IconMenuItem } from './IconMenuItem'
import { SidebarMenuAdmin } from './SidebarMenuAdmin'

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen)
  const closeSideMenu = useUIStore((state) => state.closeSideMenu)
  const { data: session } = useSession()


  const isAuthenticated = !!session?.user
  const isAdmin = session?.user.role === 'admin'

  // useEffect(() => {
  //   console.log({ session })
  //   console.log({ isAuthenticated })
  // }, [isAuthenticated, session])

  return (
    <>
      <div className=''>
        {/* Black BG */}
        {
          isSideMenuOpen && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-10"></div>
          )
        }

        {/* blur */}
        {
          isSideMenuOpen && (
            <div
              onClick={closeSideMenu}
              className="fade-in fixed top-0 left-0 w-screen h-screen z-10  backdrop-blur-[2px] backdrop-filter"
            ></div>
          )
        }

        <aside
          className={
            clsx("fixed p-5 right-0 top-0 w-full md:w-[350px] h-screen bg-white z-20  transform transition-all duration-500",
              {
                "translate-x-full": !isSideMenuOpen,
                "shadow-2xl": isSideMenuOpen
              }
            )
          }
        >
          <IoCloseOutline
            size={30}
            className='absolute top-5 right-5 cursor-pointer'
            onClick={closeSideMenu}
          />

          <div className='my-10'>

            {/* Search */}
            <div className='flex'>
              <div className="w-7 flex flex-grow justify-center items-center bg-slate-200 rounded-l-lg">
                <IoSearchOutline
                  className='text-slate-600'
                />
              </div>
              <div className="relative z-0 w-full  group">
                <input
                  type="twxt"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 pl-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Search"
                  required />
                {/* <label
                htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Search
              </label> */}
              </div>
            </div>

          </div>

          <nav className='mt-10 text-slate-600'>
            {
              isAuthenticated ? (
                <>
                  {
                    MENU_ITEMS_CLIENTS.map(menu => (
                      <SidebarMenuItem
                        key={menu.label}
                        onCloseSideMenu={closeSideMenu}
                        {...menu}
                      />
                    ))
                  }
                  <button
                    onClick={() => {
                      logOutSession()
                    }}
                    className='flex w-full items-center hover:bg-gray-200 hover:text-blue-700 rounded transition-all py-2'
                  >
                    <IconMenuItem label={'salir'} />
                    <span className="mx-3 text-lg capitalize">salir</span>
                  </button>
                </>
              ) : (
                <SidebarMenuItem
                  onCloseSideMenu={closeSideMenu}
                  label='ingresar'
                  href='/auth/login'
                />
              )
            }

            {
              isAdmin && <SidebarMenuAdmin />
            }

          </nav>
        </aside>
      </div>
    </>
  )
}
