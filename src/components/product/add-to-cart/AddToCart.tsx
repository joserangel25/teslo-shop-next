'use client'

import { useEffect, useState } from 'react'
import { QuantitySelector } from '../quantity-selector/QuantitySelector'
import { SizeSelector } from '../size-selector/SizeSelector'
import type { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/store'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const addProductInCart = useCartStore(state => state.addProductToCart)
  const [size, setSize] = useState<Size>()
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(false)

  const resetData = () => {
    setSize(undefined)
    setQuantity(1)
  }

  const addToCart = () => {
    if (!size) {
      setError(true)
      return
    }
    const { id, slug, price, images, title } = product
    const cartProduct: CartProduct = {
      id,
      slug,
      price,
      title,
      size,
      quantity,
      image: images[0]
    }
    addProductInCart(cartProduct)
    resetData()
  }

  useEffect(() => {
    if (size && error) {
      setError(false)
    }
  }, [size, error])


  return (
    <>

      {error && <span className='text-red-500 text-sm fide-in'>Debe seleccionar una talla</span>}
      {/* Selecto de tallas */}
      <SizeSelector
        sizes={product.sizes}
        selectedSize={size}
        onSelectedSize={setSize}
        error={error}
      />
      {/* Selector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
      />
      <button
        className="btn-primary my-5"
        onClick={addToCart}
      >Agregar</button>
    </>
  )
}
