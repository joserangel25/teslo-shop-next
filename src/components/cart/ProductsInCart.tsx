'use client'

import Image from 'next/image'
import { useCartStore } from '@/store'
import { QuantitySelector } from '../product'
import Link from 'next/link'

export const ProductsInCart = () => {
  const productsInCart = useCartStore(state => state.cart)
  const updateQuantityProductInCart = useCartStore(state => state.updateQuantityProductInCart)
  const removeProductOfCart = useCartStore(state => state.removeProductOfCart)
  return (
    <div>
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex mb-5">
            <Image
              src={`/products/${product.image}`}
              width={100}
              height={100}
              alt={`Imagen del producto ${product.title}`}
              className="mr-5 rounded object-cover"
            />

            <div>
              <Link href={`/product/${product.slug}`}>
                <p className="font-bold cursor-pointer hover:underline">{product.title}</p>
              </Link>
              <div className='flex gap-5'>
                <p>Talla: <span className='font-bold'>{product.size}</span></p>
                <p>${product.price}</p>
              </div>
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChanged={(newQuantity) => updateQuantityProductInCart(product, newQuantity)}
              />
              <button
                onClick={() => removeProductOfCart(product)}
                className="underline mt-1 hover:text-blue-700"
              >Remover</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}
