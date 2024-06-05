import Image from 'next/image'
import React from 'react';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  width: number;
  height: number;
}

export const ProductImage = ({ src, alt, className, width, height }: Props) => {
  const newSrc = (src)
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : '/imgs/placeholder.jpg'

  return (
    <Image
      src={newSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}
