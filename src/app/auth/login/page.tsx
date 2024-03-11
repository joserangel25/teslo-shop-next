import { LoginForm } from '@/components';
import { fontTitle } from '@/config/fonts';

export default function AuthPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center">

      <h1 className={`${fontTitle.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />
    </div>
  );
}