import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getOrderById = async (id: string) => {

  const session = await auth()
  if (!session?.user) {
    return {
      ok: false,
      message: 'Debes tener sessión iniciada'
    }
  }
  try {
    // const order = await prisma.order.findUnique({ where: { id } })
    // if (!order) {
    //   return {
    //     ok: false,
    //     message: 'No existe orden con el ID ' + id
    //   }
    // }

    // const productsOrder = await prisma.orderItem.findMany({
    //   where: { orderId: id },
    //   include: {
    //     product: true,
    //   }
    // })

    // const imagesProducts = await prisma.productImage.findMany({
    //   where: {
    //     productId: {
    //       in: productsOrder.map(p => p.productId)
    //     }
    //   }
    // })

    // const productsInOrder = productsOrder.map((item) => ({
    //   ...item,
    //   title: item.product.title,
    //   image: imagesProducts.filter(img => img.productId === item.productId)[0].url
    // }))

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            id: true,
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                images: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if (!order) {
      return {
        ok: false,
        message: 'No existe orden con el ID ' + id
      }
    }

    if (order.userId !== session.user.id && session.user.role === 'admin') {
      return {
        ok: false,
        message: 'No tienes permisos para ver esta orden.'
      }
    }

    const productsInOrderMapped = order.OrderItem.map(item => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      title: item.product.title,
      slug: item.product.slug,
      image: item.product.images[0].url
    }))

    return {
      ok: true,
      order: {
        ...order,
        OrderItem: productsInOrderMapped
      }
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Ocurrió un error'
    }
  }
}