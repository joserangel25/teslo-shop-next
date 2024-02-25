
export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[300px] sm:mx-auto px-5">
        {children}
      </div>
    </main>
  );
}