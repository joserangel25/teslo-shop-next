import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { fontTitle } from "@/config";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string }
}

export default function ProductPage({ params: { slug } }: Props) {
  const product = initialData.products.find(product => product.slug === slug)
  if (!product) {
    notFound()
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      <div className="col-span-1 md:col-span-2">

        <div className="md:hidden">
          {/* Slideshow mobile */}
          <ProductMobileSlideshow
            images={product.images}
            title={product.title}
          />
        </div>

        <div className="hidden md:block">
          {/* Slideshow  desktop*/}
          <ProductSlideshow
            images={product.images}
            title={product.title}
          />
        </div>

      </div>

      {/* Detalles del producto */}
      <div className="col-span-1 px-5">
        <h1 className={`${fontTitle.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">$ {product.price}</p>

        {/* Selecto de tallas */}
        <SizeSelector sizes={product.sizes} selectedSize="S" />
        {/* Selector de cantidad */}
        <QuantitySelector quantity={2} />
        <button className="btn-primary my-5">Agregar</button>
        {/* Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-ligth">{product.description}</p>

      </div>
    </div>
  );
}