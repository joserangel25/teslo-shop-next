import { MENU_ITEMS_ADMIN } from '@/constants'
import { SidebarMenuItem } from './SidebarMenuItem'

export const SidebarMenuAdmin = () => {
  return (
    <>
      <div className=' border border-b border-slate-300 rounded-md my-5'></div>

      {
        MENU_ITEMS_ADMIN.map(menu => (
          <SidebarMenuItem
            key={menu.label}
            {...menu}
          />
        ))
      }
    </>
  )
}
