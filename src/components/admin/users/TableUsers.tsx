
'use client'

import Link from 'next/link'
import type { User } from '@/interfaces'
import { IoCardOutline } from 'react-icons/io5'
import { changeUserRole } from '@/actions'

interface Props {
  users: User[]
}

export const TableUsers = ({ users }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th scope="col" className="text-sm font-medium text-gray-900 p-2 sm:px-6 sm:py-4 text-left">
            Email
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 p-2 sm:px-6 sm:py-4 text-left">
            Nombre completo
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 p-2 sm:px-6 sm:py-4 text-left">
            Rol
          </th>
        </tr>
      </thead>
      <tbody>

        {
          users?.map(user => (
            <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap capitalize">
                {user.name}
              </td>

              <td className="text-sm text-gray-900 font-light px-6 ">
                <select
                  value={user.role}
                  onChange={e => changeUserRole(user.id, e.target.value as 'admin' | 'user')}
                  className="text-sm text-gray-900 w-full sm:p-2" id="">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>

            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
