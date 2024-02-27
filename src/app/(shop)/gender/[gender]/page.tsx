export const revalidate = 60

import { notFound } from "next/navigation";
import { Category, initialData } from "@/seed/seed";
import { Title, ProductGrid, Pagination } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
  params: { gender: Category },
  searchParams: { page: string }
}

const CATEGORIES = ['men', 'women', 'kid', 'unisex']

const labels: Record<Category, string> = {
  'men': 'Hombres',
  'women': 'Mujeres',
  'kid': 'Niños',
  'unisex': 'Todos'
}

export default async function GenderPage({ params, searchParams }: Props) {
  const page = Number(searchParams?.page) ?? 1

  const gender = params.gender
  if (!CATEGORIES.includes(gender)) {
    notFound()
  }
  // const products = initialData.products.filter(product => product.gender === gender)
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender })
  return (
    <div className="px-5">
      <Title
        title={params.gender}
        subtitle={`Productos en la categoría ${labels[params.gender]}`}
      // className="capitalize"
      />

      <ProductGrid
        products={products}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}