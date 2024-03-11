import { RegisterForm } from '@/components';
import { fontTitle } from '@/config/fonts';


export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center">

      <h1 className={`${fontTitle.className} text-4xl mb-5`}>Crear nueva cuenta</h1>

      <RegisterForm />
    </div>
  );
}