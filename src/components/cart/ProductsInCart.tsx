'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { QuantitySelector } from '../product'
import { currencyFormatter } from '@/utils'
import { useCartStore } from '@/store'

export const ProductsInCart = () => {
  const pathName = usePathname()
  const router = useRouter()
  const productsInCart = useCartStore(state => state.cart)
  const updateQuantityProductInCart = useCartStore(state => state.updateQuantityProductInCart)
  const removeProductOfCart = useCartStore(state => state.removeProductOfCart)
  const isCheckout = pathName === '/checkout'

  if (isCheckout && !productsInCart.length) {
    router.replace('/')
  }

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
              {
                isCheckout ? (
                  <p className="font-bold">{product.title}</p>

                ) : (
                  <Link href={`/product/${product.slug}`}>
                    <p className="font-bold cursor-pointer hover:underline">{product.title}</p>
                  </Link>
                )
              }
              <div className='flex gap-5'>
                <p>Talla: <span className='font-bold'>{product.size} ({product.quantity})</span></p>
                {
                  isCheckout ? (
                    <p>{currencyFormatter(product.price * product.quantity)}</p>
                  ) : (
                    <p>${product.price}</p>
                  )
                }
              </div>

              {
                !isCheckout && (
                  <>
                    <QuantitySelector
                      quantity={product.quantity}
                      onQuantityChanged={(newQuantity) => updateQuantityProductInCart(product, newQuantity)}
                    />
                    <button
                      onClick={() => removeProductOfCart(product)}
                      className="underline mt-1 hover:text-blue-700"
                    >Remover</button>
                  </>
                )
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}
