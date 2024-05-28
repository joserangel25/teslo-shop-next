
import { redirect } from 'next/navigation';
import { ItemCart, LabelPaidOrder, PaypalButton, Summary, Title } from "@/components";

import { getOrderById } from '@/actions';

interface Props {
  params: { id: string }
}

export default async function OrderPage({ params: { id: orderId } }: Props) {

  const { order, ok } = await getOrderById(orderId)
  if (!ok) {
    redirect('/')
  }
  return (
    <div className="flex justify-center items-center mb-72 px-5 lg:p-0">
      <div className="flex flex-col w-[1000px] relative">
        <Title title={`Orden No. ${orderId.split('-').at(-1)}`} />

        <div className="flex flex-col sm:flex-row gap-10">

          <div className="flex w-full md:w-1/2 flex-col mt-5">
            <LabelPaidOrder isPaid={order!.isPaid} />

            {
              order?.OrderItem.map(order => (
                <ItemCart
                  key={order.id + `-${order.size}`}
                  order={order}
                />
              ))
            }
          </div>

          {/* Order Summary */}
          <div className="bg-white w-full md:w-auto rounded-xl shadow-xl p-7 self-start sticky top-5">

            <h2 className="text-xl font-bold mb-2">Dirección de entrega</h2>
            <div className="">
              <p className='capitalize'>{order?.OrderAddress?.firstName} {order?.OrderAddress?.lastName}</p>
              <p>{order?.OrderAddress?.phone}</p>
              <p>{order?.OrderAddress?.address}</p>
              <p>{order?.OrderAddress?.city} - {order?.OrderAddress?.countryId}</p>
            </div>

            <div className="h-0.5 bg-slate-200 my-4 rounded-md" />
            <Summary
              total={order!.total}
              subTotal={order!.subTotal}
              tax={order!.tax}
              totalProducts={order!.itemsInOrder}
            />

            {
              !order?.isPaid && (
                <div className='mt-3'>
                  <PaypalButton
                    orderId={order!.id}
                    amount={order!.total}
                  />
                </div>
              )
            }
          </div>

        </div>
      </div>
    </div>
  );
}