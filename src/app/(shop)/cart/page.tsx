import Link from "next/link";
import { OrderSummary, ProductsInCart, Title } from "@/components";


export const metadata = {
  title: 'Tus productos en el carrito'
}

export default function CartPage() {

  // if (!productsInCart) {
  //   return redirect('/empty')
  // }
  return (
    <div className="flex justify-center items-center mb-72 px-5 lg:p-0">
      <div className="flex flex-col w-[1000px] relative mx-auto">
        <Title title="Tus productos en el carrito" />

        <div className="flex w-full flex-col sm:flex-row gap-10">

          <div className="flex w-full md:w-1/2 flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link
              href={'/'}
              className="mb-5 underline "
            >
              Seguir comprando
            </Link>

            <ProductsInCart />
          </div>

          {/* Order Summary */}
          <div className="bg-white w-full md:w-[346px] rounded-xl shadow-xl p-7 self-start sticky top-5">
            <OrderSummary />
            <Link
              className="btn-primary block text-center mt-2"
              href={'/checkout/address'}>Checkout</Link>
          </div>

        </div>
      </div>
    </div>
  );
}