'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
  onQuantityChanged: (value: number) => void
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {

  const onValueChange = (value: number) => {
    if (quantity + value < 1) return

    onQuantityChanged(quantity + value)
  }
  return (
    <div className="flex">
      <button
        onClick={() => onValueChange(-1)}
      ><IoRemoveCircleOutline /></button>
      <span
        className="w-20 mx-3 px-4 py-1 bg-gray-200 text-center rounded"
      >{quantity}</span>
      <button
        onClick={() => onValueChange(1)}
      ><IoAddCircleOutline /></button>
    </div>
  )
}
