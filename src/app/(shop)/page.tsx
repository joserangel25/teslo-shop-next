export const revalidate = 60

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";
// import { initialData } from "@/seed/seed";
// const products = initialData.products; 

interface Props {
  searchParams?: { page: string }
}

export default async function Home({ searchParams }: Props) {

  const page = Number(searchParams?.page) ?? 1
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page })

  if (!products.length) {
    redirect('/?page=1')
  }
  return (
    <div className="px-5">
      <Title
        title="Home"
        subtitle="Todos los productos."
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
