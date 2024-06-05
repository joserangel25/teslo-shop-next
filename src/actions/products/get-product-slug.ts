'use server'

import prisma from "@/lib/prisma"

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          select: { url: true, id: true }
        }
      }
    })

    if (!product) return null
    return {
      ...product,
      // images: product.images.map(img => img.url)
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error al obtener producto por Slug')
  }
}