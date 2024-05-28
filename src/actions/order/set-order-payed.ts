'use server'

import prisma from '@/lib/prisma'

export const setOrderPayed = async (orderId: string) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    })

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: '500 - La actualización de pago no se pudo realizar en la DB.'
    }
  }
}