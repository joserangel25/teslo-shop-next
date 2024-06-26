export const revalidate = 604800 // 7 días

import { Suspense } from 'react';
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/actions";
import { AddToCart, ProductMobileSlideshow, ProductSlideshow, StockLabel, StockServerLabel } from "@/components";
import { fontTitle } from "@/config";
import { ResolvingMetadata, Metadata } from "next";
// import { initialData } from "@/seed/seed";

interface Props {
  params: { slug: string }
}

//Cuando tenemos metadata dinámica
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1].url}`],
    },
  }
}

export default async function ProductPage({ params: { slug } }: Props) {
  // const product = initialData.products.find(product => product.slug === slug)
  const product = await getProductBySlug(slug)
  if (!product) {
    notFound()
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      <div className="col-span-1 md:col-span-2">

        <div className="md:hidden">
          {/* Slideshow mobile */}
          <ProductMobileSlideshow
            images={product.images.map(img => img.url)}
            title={product.title}
          />
        </div>

        <div className="hidden md:block">
          {/* Slideshow  desktop*/}
          <ProductSlideshow
            images={product.images.map(img => img.url)}
            title={product.title}
          />
        </div>

      </div>

      {/* Detalles del producto */}
      <div className="col-span-1 px-5">

        <StockLabel slug={product.slug} />
        {/* TODO: Suspense no funciona... */}
        {/* <Suspense fallback={<p>cargando...</p>}>
          <StockServerLabel slug={product.slug} />
        </Suspense> */}

        <h1 className={`${fontTitle.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">$ {product.price}</p>

        <AddToCart product={product} />


        {/* Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-ligth">{product.description}</p>

      </div>
    </div>
  );
}