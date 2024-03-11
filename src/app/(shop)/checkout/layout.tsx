import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function CheckoutLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth()

  if (!session?.user) {
    // redirect('/auth/login?redirect=/profile')
    redirect('/auth/login?redirect=/checkout/addres')

  }
  return (
    <>
      {children}
    </>
  );
}