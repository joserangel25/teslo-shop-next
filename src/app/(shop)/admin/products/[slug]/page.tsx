import { getAllCategories, getProductBySlug } from '@/actions';
import { ProductForm, Title } from '@/components';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  }
}

export default async function ProductAdminPage({ params }: Props) {
  const { slug } = params

  // const product = await getProductBySlug(slug)
  const [product, categories] = await Promise.all([getProductBySlug(slug), getAllCategories()])

  if (!product?.id) {
    redirect('/admin/products')
  }

  const title = slug === 'new' ? 'Agregar' : 'Editar producto';
  return (
    <>
      <Title title={title} />
      <ProductForm
        product={product}
        categories={categories}
      />
    </>
  );
}