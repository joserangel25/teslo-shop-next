import { fontTitle } from "@/config"

interface Props {
  title: string
  subtitle?: string
  className?: string
}
export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={` ${className} mt-3 px-5 lg:px-0`}>
      <h1 className={`${fontTitle.className} antialiased text-2xl md:text-4xl font-semibold my-5`}>{title}</h1>
      {
        subtitle && (
          <h3 className="text-xl mb-5">{subtitle}</h3>
        )
      }
    </div>
  )
}
