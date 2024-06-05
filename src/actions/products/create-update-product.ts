'use server'
import { revalidatePath } from 'next/cache'
import { Gender, Product } from '@prisma/client'
import { z } from 'zod'

import prisma from '@/lib/prisma'
import { Size } from '@/interfaces'

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
  inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform(val => val.split(',')),
  tags: z.coerce.string().transform(val => val.split(',')),
  gender: z.nativeEnum(Gender)

})
export const createUpdatedProduct = async (data: FormData) => {
  const productParsed = productSchema.safeParse(Object.fromEntries(data))

  if (!productParsed.success) {
    console.log(productParsed.error)
    return { ok: false }
  }

  const product = productParsed.data

  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim()
  const { id, ...rest } = product
  try {
    const prismaTransaction = await prisma.$transaction(async (tsx) => {

      let productAction: Product;

      if (id) {
        productAction = await tsx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            }
          },
          include: {
            images: true
          }
        })
      } else {

        productAction = await tsx.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            }
          }
        })
      }

      if (data.getAll('images')) {
        const { ok, images: newImages } = await uploadImages(data.getAll('images') as File[])
        if (!ok && !newImages) {
          throw new Error("No se pudieron subir las imágenes, rollingback");
        }

        await tsx.productImage.createMany({
          data: newImages!.map(url => ({ url, productId: productAction.id }))
        })
      }

      return {
        product: productAction
      }
    })

    // Revalidar path

    revalidatePath('/admins/products')
    revalidatePath(`/admin/products/${prismaTransaction.product.slug}`)
    revalidatePath(`/products/${prismaTransaction.product.slug}`)

    return {
      ok: true,
      product: prismaTransaction.product
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Validar logs, no se pudo realizar crear/actualizar producto'
    }
  }
}


const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      const buffer = await image.arrayBuffer()
      const base64Image = Buffer.from(buffer).toString('base64')
      return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
        folder: 'teslo-shop'
      }).then(r => r.secure_url)
    })

    const uploadImages = await Promise.all(uploadPromises)
    return {
      ok: true,
      images: uploadImages
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo subir las imágenes al servidor'
    }
  }
}