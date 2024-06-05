'use server'

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      message: 'No se puede borrar la imagen. Contacte al administrador.'
    }
  }

  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? ''
  try {
    await cloudinary.uploader.destroy(`teslo-shop/${imageName}`)
    const { product } = await prisma.productImage.delete({
      where: {
        id: imageId
      },
      select: {
        product: {
          select: {
            slug: true
          }
        }
      }
    })

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${product.slug}`)
    revalidatePath(`/products/${product.slug}`)

    return {
      ok: true,
      message: 'Proceso terminado con éxito.'
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Ocurrió un error con el servicio de cloudinary'
    }
  }
}