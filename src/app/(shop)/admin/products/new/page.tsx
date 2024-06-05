import { getAllCategories } from '@/actions'
import { ProductForm, Title } from '@/components'

export default async function AdminNewProductPage() {

  const categories = await getAllCategories()

  return (
    <>
      <Title title='Nuevo producto' />
      <ProductForm
        product={{}}
        categories={categories}
      />
    </>
  );
}