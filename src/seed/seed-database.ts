import { initialData } from "./seed"
import prisma from "../lib/prisma"

async function main() {
  if (process.env.NODE_ENV === 'production') return;

  await Promise.all([
    prisma.product.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.category.deleteMany(),
    prisma.user.deleteMany()
  ])
  const { categories, products, users } = initialData

  //Users
  await prisma.user.createMany({
    data: users
  })

  // Categorías
  const categoriesData = categories.map(category => ({ name: category }))
  await prisma.category.createMany({
    data: categoriesData
  })
  const categoriesDB = await prisma.category.findMany()
  const categoriesObject = categoriesDB.reduce((obj, category) => {
    obj[category.name] = category.id
    return obj
  }, {} as Record<string, string>)

  products.forEach(async ({ type, images, ...rest }) => {
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesObject[rest.gender],
        images: {
          createMany: {
            data: images.map(ima => ({ url: ima }))
          }
        }
      }
    })
  })
}

(() => {
  main()
})()