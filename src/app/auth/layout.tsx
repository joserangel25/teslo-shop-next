import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth()
  if (session?.user) {
    redirect('/')
  }

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[300px] sm:mx-auto px-5">
        {children}
      </div>
    </main>
  );
}