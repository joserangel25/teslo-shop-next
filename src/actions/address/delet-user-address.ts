'use server'

import prisma from '@/lib/prisma'



export const deleteUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findFirst({ where: { userId } })

    if (!address) return
    //TODO: validar si la dirección que está en la DB es la misma que está colocando ahora y que no quiere guardar para así sí borrar.
    await prisma.userAddress.delete({ where: { userId } })
    return {
      ok: true,
      message: 'Dirección eliminada correctamente.'
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo realizar la eliminación'
    }
  }
}