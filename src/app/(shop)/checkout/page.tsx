import Link from "next/link";
import { ProductsInCart, Title, WrappedCheckoutSummary } from "@/components";

// TODO: validar, si no hay productos en car, salir de la pantalla
export default function ChechkoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-5 lg:p-0">
      <div className="flex flex-col w-[1000px] relative">
        <Title title="Verifica la compra" />

        <div className="flex flex-col sm:flex-row gap-10">

          <div className="flex w-full md:w-1/2 flex-col mt-5">
            <span className="text-xl">¿Algo no está bien?</span>
            <Link
              href={'/cart'}
              className="mb-5 underline "
            >
              Editar pedido
            </Link>

            <ProductsInCart />
          </div>

          {/* Order Summary */}
          <WrappedCheckoutSummary />

        </div>
      </div>
    </div>
  );
}