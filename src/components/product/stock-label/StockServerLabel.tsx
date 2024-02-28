import { getStockOfProductBySlug } from "@/actions"

interface Props {
  slug: string
}
export const StockServerLabel = async ({ slug }: Props) => {

  const stock = await getStockOfProductBySlug(slug)
  return (
    <h2 className={`font-semibold`}>Stock: {stock}</h2>
  )
}
