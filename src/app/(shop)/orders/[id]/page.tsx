import Link from "next/link";
import Image from "next/image";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

interface Props {
  params: { id: string }
}

export default function OrderPage({ params: { id: orderId } }: Props) {


  return (
    <div className="flex justify-center items-center mb-72 px-5 lg:p-0">
      <div className="flex flex-col w-[1000px] relative">
        <Title title={`Orden No. ${orderId}`} />

        <div className="flex flex-col sm:flex-row gap-10">

          <div className="flex flex-col mt-5">
            <div className={
              clsx(
                "flex gap-3 items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': true
                }
              )
            }>
              <IoCardOutline size={30} />
              {/* <span className="">Orden pendiente de pago</span> */}
              <span className="">Orden pagada</span>
            </div>

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
          </div>

        </div>
      </div>
    </div>
  );
}