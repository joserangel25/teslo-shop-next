import Link from 'next/link';
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormatter } from '@/utils';

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function AdminProductsPage({ searchParams }: Props) {

  const page = Number(searchParams?.page) ?? 1
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page })

  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className="flex justify-end mb-5">
        <Link href={'/admin/products/new'} className='btn btn-primary'>Nuevo producto</Link>
      </div>

      <div className="mb-10 md:overflow-hidden md:overflow-x-auto w-full">
        <table className="mb-5  w-full ">
          <thead className="bg-gray-200 border-b ">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="hidden md:block text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Título
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="hidden md:block text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Género
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Inventario
              </th>
              <th scope="col" className="hidden md:block text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>

            {
              products?.map(product => (
                <tr key={product.id} className="relative bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td> */}
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap capitalize">
                    <Link href={`/product/${product.slug}`} className="hover:underline">
                      <ProductImage
                        src={product?.images[0]?.url}
                        alt={`Imagen del producto ${product.title}`}
                        width={80}
                        height={80}
                        className='w-20 h-20 rounded object-cover'
                      />
                    </Link>
                  </td>

                  <td className="hidden md:block  text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/admin/products/${product.slug}`} className="hover:underline">{product.title}</Link>
                  </td>

                  <td className=" text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {currencyFormatter(product.price)}
                  </td>

                  <td className="md:absolute md:top-[50%] md:translate-y-[-50%] hidden md:block text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.gender}
                  </td>

                  <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {product.inStock}
                  </td>

                  <td className="hidden md:block text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {product.sizes.join(', ')}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}