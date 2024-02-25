import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col max-w-7xl mx-auto">
      <TopMenu />
      <Sidebar />
      <div className="">
        {children}

      </div>

      <Footer />
    </main>
  );
}