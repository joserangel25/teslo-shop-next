'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const changeUserRole = async (userId: string, role: 'admin' | 'user') => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe estar autenticado como administrador.'
    }
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role }
    })

    revalidatePath('/admin/users')
    return {
      ok: true,
      message: 'Rol cambiado con éxito'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo actualizar el Rol.'
    }
  }
}