'use client'

import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity)

  const onCuantityChange = (value: number) => {
    if (count + value < 1) return

    setCount(count + value)
  }
  return (
    <div className="flex">
      <button
        onClick={() => onCuantityChange(-1)}
      ><IoRemoveCircleOutline /></button>
      <span
        className="w-20 mx-3 px-4 py-1 bg-gray-200 text-center rounded"
      >{count}</span>
      <button
        onClick={() => onCuantityChange(1)}
      ><IoAddCircleOutline /></button>
    </div>
  )
}
