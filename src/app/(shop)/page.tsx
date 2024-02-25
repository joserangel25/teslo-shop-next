import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
const products = initialData.products;

export default function Home() {
  return (
    <div className="px-5">
      <Title
        title="Home"
        subtitle="Todos los productos."
      />
      <ProductGrid
        products={products}
      />
    </div>
  );
}
