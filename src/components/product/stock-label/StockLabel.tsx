'use client'

import { useEffect, useState } from "react"
import { getStockOfProductBySlug } from "@/actions/products/get-stock-by-slug"

interface Props {
  slug: string
}
export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStock = async () => {
      setLoading(true)
      const stockDb = await getStockOfProductBySlug(slug)
      setStock(stockDb)
      setLoading(false)
    }

    getStock()
  }, [slug])

  return (
    <>

      {
        !loading ?
          (<h2
            className={`font-semibold`}
          > Stock: {stock}</h2>)
          :
          (<h2
            className={`bg-gray-200 w-full animate-pulse`}
          >&nbsp;</h2>)
      }
    </>
  )
}
