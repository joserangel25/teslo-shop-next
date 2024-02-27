'use client'

import { generatePaginationArrayNumbers } from "@/utils"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

interface Props {
  totalPages: number
  currentPage: number
}

export const Pagination = ({ totalPages, currentPage }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageUrl = (numberPage: string | number) => {
    const params = new URLSearchParams(searchParams)
    if (numberPage === '...' || +numberPage > totalPages) {
      return `${pathname}?${params.toString()}`
    }

    if (+numberPage === 0) {
      return `${pathname}?page=1`
    }

    // if(+numberPage > totalPages){
    //   return `${pathname}?page=`
    // }

    params.set('page', numberPage.toString())
    return `${pathname}?${params.toString()}`
  }
  return (
    <div className="flex justify-center mb-10">
      <nav >
        <ul className="flex items-center list-style-none">
          <li className="">
            <Link
              className={`relative block py-1.5 px-3 border-0  hover:bg-gray-200 outline-none transition-all duration-300 rounded   focus:shadow-none
              ${currentPage === 1 ? 'pointer-events-none hover:bg-transparent text-gray-400' : 'text-gray-800'}
              `}
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={25} />
            </Link>
          </li>
          {/* {
            Array.from({ length: totalPages }).map((_, idx) => (
              <li className="" key={idx + 1}>
                <Link
                  className={`relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded focus:shadow-none 
                  ${currentPage === (idx + 1) ? 'text-white hover:text-white hover:bg-blue-600 bg-blue-600' : 'text-gray-700 hover:text-gray-800 hover:bg-gray-200 '}`}
                  href={createPageUrl(idx + 1)}
                >{idx + 1}</Link>
              </li>
            ))
          } */}

          {
            generatePaginationArrayNumbers({ currentPage, totalPages }).map((page, idx) => (
              <li key={`${page}-${idx}`}>
                <Link
                  className={`relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded focus:shadow-none 
                  ${currentPage === (page) ? 'text-white hover:text-white hover:bg-blue-600 bg-blue-600' : 'text-gray-700 hover:text-gray-800 hover:bg-gray-200 '}`}
                  href={createPageUrl(idx + 1)}
                >{page}</Link>
              </li>
            ))
          }

          <li className="">
            <Link
              className={`relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded   hover:bg-gray-200 focus:shadow-none
              ${currentPage === totalPages ? 'pointer-events-none hover:bg-transparent text-gray-400' : 'text-gray-800'}
              `}
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={25} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
