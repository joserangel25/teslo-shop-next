'use server'

import prisma from '@/lib/prisma';

export const updateTransactionIdInOrder = async (orderId: string, transactionId: string) => {
  try {

    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })

    // const order = await prisma.order.update({
    //   where: { id: orderId },
    //   data: {
    //     transactionId
    //   }
    // })

    if (!order) {
      throw new Error("No existe orden con ese Id " + orderId);
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { transactionId }
    })

    return {
      ok: true,
      message: 'Orden actualizada con su transactionId'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Ocurrió un error en el proceso. Valide con el administrador.'
    }
  }
}