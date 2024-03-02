
import { Size } from '@/interfaces'
import clsx from "clsx"

interface Props {
  selectedSize?: Size,
  sizes: Size[]
  error: boolean

  onSelectedSize: (size: Size) => void
}

export const SizeSelector = ({ selectedSize, sizes, error, onSelectedSize }: Props) => {
  return (
    <div className="mb-2">
      <h3 className="font-bold mb-2">Tallas disponibles</h3>

      <div className="flex">
        {
          sizes.map(size => (
            <button
              key={size}
              onClick={() => onSelectedSize(size)}
              className={
                clsx(
                  "mx-2 hover:underline text-lg transition-all",
                  {
                    "underline": size === selectedSize,
                    "text-red-500": error
                  }
                )
              }
            >{size}</button>
          ))
        }
      </div>
    </div>
  )
}
