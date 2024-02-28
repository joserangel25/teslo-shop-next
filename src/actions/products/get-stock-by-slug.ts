'use server'

import prisma from "@/lib/prisma";
import { sleep } from "@/utils";

export const getStockOfProductBySlug = async (slug: string) => {
  try {
    await sleep(2)
    const product = await prisma.product.findUnique({ where: { slug }, select: { inStock: true } })
    return product ? product.inStock : 0
  } catch (error) {
    console.log(error)
    throw new Error("Hubo un error al obtener el stcok del producto " + slug);
  }
}