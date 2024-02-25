import { notFound } from "next/navigation";
import { Category, initialData } from "@/seed/seed";
import { Title, ProductGrid } from "@/components";

interface Props {
  params: { id: Category }
}

const CATEGORIES = ['men', 'women', 'kid']

const labels: Record<Category, string> = {
  'men': 'Hombres',
  'women': 'Mujeres',
  'kid': 'Niños',
  'unisex': 'Todos'
}

export default function CategoryPage({ params }: Props) {
  if (!CATEGORIES.includes(params.id)) {
    notFound()
  }
  const products = initialData.products.filter(product => product.gender === params.id)
  return (
    <>
      <Title
        title={params.id}
        subtitle={`Productos en la categoría ${labels[params.id]}`}
      // className="capitalize"
      />

      <ProductGrid
        products={products}
      />
    </>
  );
}