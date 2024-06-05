'use server'

import { auth } from '@/auth.config';
import type { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size
}

export const placeOrder = async (products: ProductToOrder[], address: Address) => {
  try {

    if (!products.length) {
      return {
        ok: false,
        message: 'Proceso incorrecto. No está seleccionando productos.'
      }
    }

    if (!address.firstName) {
      return {
        ok: false,
        message: 'Proceso incorrecto. La dirección es obligatoria.'
      }
    }
    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
      return {
        ok: false,
        message: 'No hay sesión de usuario'
      }
    }

    // Obtener información de los productos
    const productsDb = await prisma.product.findMany({
      where: {
        id: {
          in: products.map(p => p.productId)
        }
      }
    })

    //Calcular los montos
    const itemsInOrder = products.reduce((count, p) => count + p.quantity, 0)

    const { subTotal, tax, total } = products.reduce((totals, item) => {
      const productDb = productsDb.find(p => p.id === item.productId)

      if (!productDb) throw new Error(`${item.productId} no existe - 500`)

      const subTotal = productDb.price * item.quantity

      totals.subTotal += subTotal
      totals.tax += subTotal * 0.19
      totals.total += subTotal * 1.19

      return totals
    }, { subTotal: 0, tax: 0, total: 0 })

    // Crear transacción en DB
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock 
      const updatedProductsPromise = productsDb.map((product) => {
        const productQuantity = products.filter(p => p.productId === product.id).reduce((sum, item) => sum + item.quantity, 0)

        if (!productQuantity) {
          throw new Error(`${product.id} no tiene cantidad definida, es 0`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity
            }
          }
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromise)

      // Verificar valores negativos en la existencia = no hay estock
      updatedProducts.forEach(pro => {
        if (pro.inStock < 0) {
          throw new Error(`${pro.title} no tiene inventario suficiente`);
        }
      })

      // 2. Crear la orden y detalle en DB
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,

          OrderItem: {
            createMany: {
              data: products.map(p => ({
                ...p,
                price: productsDb.find(i => i.id === p.productId)?.price ?? 0
              }))
            }
          }
        }
      })

      // Validar si algún orderItem tiene un precio de $0, de ser así lanzar un error para que se revierta toda la transacción
      // 3. Crear dirección de orden
      const { country, ...restAddress } = address
      await tx.orderAddress.create({
        data: {
          ...restAddress,
          orderId: order.id,
          countryId: address.country,
        }
      })
      return { order, updatedProducts }
    })

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx
    }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.message
    }
  }
}