'use server'

import { Gender } from "@/interfaces"
import prisma from "@/lib/prisma"

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {

  if (isNaN(Number(page)) || page < 1) page = 1

  try {

    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      where: { gender },
      include: {
        images: {
          take: 2,
          select: {
            url: true,
            id: true
          }
        }
      },
      orderBy: {
        title: 'desc'
      }
    })

    const totalQuantityProducts = await prisma.product.count({
      where: { gender }
    })

    const totalPages = Math.ceil(totalQuantityProducts / take)

    return {
      currentPage: page,
      totalPages,
      products: products.map(product => ({
        ...product,
        // images: product.images.map(image => image.url)
      }))
    }
  } catch (error) {
    console.log(error)
    throw new Error("Hubo un error con los pruductos");

  }
}