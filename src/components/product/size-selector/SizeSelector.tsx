import type { Size } from "@/seed/seed"
import clsx from "clsx"

interface Props {
  selectedSize: Size,
  sizes: Size[]
}

export const SizeSelector = ({ selectedSize, sizes }: Props) => {
  return (
    <div className="my-2">
      <h3 className="font-bold mb-2">Tallas disponibles</h3>

      <div className="flex">
        {
          sizes.map(size => (
            <button
              key={size}
              className={
                clsx(
                  "mx-2 hover:underline text-lg",
                  {
                    "underline": size === selectedSize
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
