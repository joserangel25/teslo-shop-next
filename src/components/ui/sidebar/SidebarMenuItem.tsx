import Link from 'next/link'
import { IconMenuItem } from './IconMenuItem'

interface Props {
  label: string
  href: string
}

export const SidebarMenuItem = ({ label, href }: Props) => {
  return (
    <Link
      href={href}
      className='flex items-center hover:bg-gray-200 hover:text-blue-700 rounded transition-all py-2'
    >
      <IconMenuItem label={label} />
      <span className="mx-3 text-lg capitalize">{label}</span>
    </Link>
  )
}
