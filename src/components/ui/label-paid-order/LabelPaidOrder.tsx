import clsx from 'clsx'
import { IoCardOutline } from 'react-icons/io5'

interface Props {
  isPaid: boolean
}

export const LabelPaidOrder = ({ isPaid }: Props) => {
  return (
    <div className={
      clsx(
        "flex gap-3 items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        {
          'bg-red-500': !isPaid,
          'bg-green-500': isPaid
        }
      )
    }>
      <IoCardOutline size={30} />
      <span className="">{isPaid ? 'Orden pagada' : 'Orden pendiente de pago'}</span>
    </div>
  )
}
