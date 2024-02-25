'use client'

import { Product } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Props {
  product: Product
}

export const ProductGridItem = ({ product }: Props) => {
  const [image, setImage] = useState(product.images[0])
  const changeImage = (position: number) => {
    setImage(product.images[position])
  }
  return (
    <div className="rounded-md overflow-hidden fdae-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${image}`}
          alt={`Imagen del producto ${product.title}`}
          className="w-full object-cover fade-in rounded-sm"
          rel="preload"
          width={500}
          height={500}
          onMouseEnter={() => changeImage(1)}
          onMouseLeave={() => changeImage(0)}
        />
      </Link>


      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-700" href={`/product/${product.slug}`}>{product.title}</Link>
        <span className="font-bold">$ {product.price}</span>
      </div>
    </div>
  )
}
