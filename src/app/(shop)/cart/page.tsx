import Link from "next/link";
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export default function CartPage() {

  if (!productsInCart) {
    return redirect('/empty')
  }
  return (
    <div className="flex justify-center items-center mb-72 px-5 lg:p-0">
      <div className="flex flex-col w-[1000px] relative">
        <Title title="Cart" />

        <div className="flex flex-col sm:flex-row gap-10">

          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link
              href={'/'}
              className="mb-5 underline "
            >
              Seguir comprando
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
                    <p>${product.price}</p>
                    <QuantitySelector quantity={3} />
                    <button
                      className="underline mt-1 hover:text-blue-700"
                    >Remover</button>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Order Summary */}
          <div className="bg-white w-full md:w-auto rounded-xl shadow-xl p-7 self-start sticky top-5">
            <h2 className="text-2xl mb2">Resumen de la orden</h2>
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

            <Link className="btn-primary block text-center mt-2" href={'/checkout/address'}>Checkout</Link>
          </div>

        </div>
      </div>
    </div>
  );
}