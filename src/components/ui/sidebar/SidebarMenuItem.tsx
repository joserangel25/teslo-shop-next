import Link from 'next/link'
// import { useSession } from 'next-auth/react'
import { IconMenuItem } from './IconMenuItem'
import { logOutSession } from '@/actions'

interface Props {
  label: string
  href: string
  onCloseSideMenu?: () => void
}

export const SidebarMenuItem = ({ label, href, onCloseSideMenu }: Props) => {
  // const { data: session } = useSession()
  const onClick = () => {
    if (onCloseSideMenu) {
      onCloseSideMenu()
    }
    if (label === 'salir') {
      logOutSession()
    }
  }

  // if (session?.user && label === 'ingresar') {
  //   return <></>
  // }
  return (
    <Link
      href={href}
      onClick={onClick}
      className='flex items-center hover:bg-gray-200 hover:text-blue-700 rounded transition-all py-2'
    >
      <IconMenuItem label={label} />
      <span className="mx-3 text-lg capitalize">{label}</span>
    </Link>
  )
}
