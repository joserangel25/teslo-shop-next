import { currencyFormatter } from '@/utils'

interface Props {
  total: number,
  subTotal: number,
  tax: number,
  totalProducts: number,
}
export const Summary = ({ total, subTotal, tax, totalProducts }: Props) => {
  return (
    <div className="">
      <h2 className="text-xl font-bold mb2">Resumen de la orden</h2>
      <div className="grid grid-cols-2">
        <span className="font-medium">No. de productos</span>
        <span className="text-right">{totalProducts}</span>

        <span className="font-medium">Subtotal</span>
        <span className="text-right">{currencyFormatter(subTotal)}</span>

        <span className="font-medium">IVA (19%)</span>
        <span className="text-right">{currencyFormatter(tax)}</span>

        <span className="mt-5 text-xl font-medium">Total:</span>
        <span className="mt-5 text-xl text-right">{currencyFormatter(total)}</span>
      </div>

    </div>
  )
}
