import { CartProduct } from '@/interfaces'
import { currencyFormatter } from '@/utils'
import Image from 'next/image'

interface Props {
  order: Partial<CartProduct>
}

export const ItemCart = ({ order }: Props) => {
  return (
    <>
      <div className="flex mb-5">
        <Image
          src={`/products/${order.image}`}
          width={100}
          height={100}
          alt={`Imagen del producto ${order.title}`}
          className="mr-5 rounded object-cover"
        />

        <div>
          <p className="font-bold">{order.title}</p>
          <p>{currencyFormatter(order.price!)}</p>
          <p>{order.quantity} {order.quantity! > 1 ? 'unidades' : 'unidad'} - Talla <span className='font-bold'>{order.size}</span></p>
          <p className="font-medium">Subtotal: {currencyFormatter(order.price! * 3)} </p>
        </div>
      </div>
    </>
  )
}
