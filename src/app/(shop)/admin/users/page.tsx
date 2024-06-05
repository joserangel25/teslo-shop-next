import { getOrderByUser, getPaginatedOrders, getPaginatedUsers } from '@/actions';
import { TableUsers, Title } from '@/components';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

export default async function AdminUsersPage() {

  const { users, ok } = await getPaginatedUsers()

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="Usuarios de la aplicación" />

      <div className="mb-10">
        <TableUsers users={users!} />
      </div>
    </>
  );
}