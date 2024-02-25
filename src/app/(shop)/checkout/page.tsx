import Link from "next/link";
import Image from "next/image";
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export default function ChechkoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-5 lg:p-0">
      <div className="flex flex-col w-[1000px] relative">
        <Title title="Verifica la compra" />

        <div className="flex flex-col sm:flex-row gap-10">

          <div className="flex flex-col mt-5">
            <span className="text-xl">¿Algo no está bien?</span>
            <Link
              href={'/cart'}
              className="mb-5 underline "
            >
              Editar pedido
            </Link>

            {
              productsInCart.map(product => (
                <div key={product.slug} className="flex mb-5">
                  <Image
                    src={`/products/${product.images[0]}`}
                    width={100}
                    height={100}
                    alt={`Imagen del producto ${product.title}`}
                    className="mr-5 rounded object-cover"
                  />

                  <div>
                    <p className="font-bold">{product.title}</p>
                    <p>${product.price} * 3</p>
                    <p className="font-medium">Subtotal: ${product.price * 3} </p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Order Summary */}
          <div className="bg-white w-full md:w-auto rounded-xl shadow-xl p-7 self-start sticky top-5">

            <h2 className="text-xl font-bold mb-2">Dirección de entrega</h2>
            <div className="">
              <p>Jose Rangel</p>
              <p>302 545 8457</p>
              <p>Cll 36 # 5a - 04</p>
              <p>Soledad - Atlántico, Colombia</p>
            </div>

            <div className="h-0.5 bg-slate-200 my-4 rounded-md" />
            <h2 className="text-xl font-bold mb2">Resumen de la orden</h2>
            <div className="grid grid-cols-2">
              <span className="font-medium">No. de productos</span>
              <span className="text-right">3</span>

              <span className="font-medium">Subtotal</span>
              <span className="text-right">$ 100</span>

              <span className="font-medium">IVA (19%)</span>
              <span className="text-right">$ 19</span>

              <span className="mt-5 text-xl font-medium">Total a pagar</span>
              <span className="mt-5 text-xl text-right">$ 119</span>
            </div>

            <p className="text-sm max-w-72 my-3 text-center">Al hacer clic en {"'"}Generar orden{"'"} aceptas nuestros <span className="underline font-semibold">términos y condiciones.</span> </p>
            <Link className="btn-primary block text-center mt-2" href={'/orders/123'}>Generar Orden</Link>
          </div>

        </div>
      </div>
    </div>
  );
}