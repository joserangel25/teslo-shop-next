'use client'

import { login, registerNewUser } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormInputs {
  name: string;
  email: string;
  password: string
}

export const RegisterForm = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const user = await registerNewUser(data)
    await login({ email: data.email.toLowerCase(), password: data.password })
    window.location.replace('/')
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col">

      {/* {
        errors.name?.type === 'required' && (
          <span className='text-red-700 text-sm'>El nombre es obligatorio</span>
        )
      } */}
      <label htmlFor="name">Nombre completo</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5 outline-none",
          {
            "border-red-700": errors.name
          }
        )}
        type="text"
        {...register('name', { required: true })}
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5 outline-none",
          {
            "border-red-700 border": errors.email
          }
        )}
        type="email"
        {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
      />


      <label htmlFor="password">Contraseña</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5 outline-none",
          {
            "border-red-700 border": errors.password
          }
        )}
        type="password"
        {...register('password', { required: true, minLength: 6 })}
      />

      <button
        type='submit'
        className="btn-primary">
        Ingresar
      </button>


      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        Ingresar
      </Link>

    </form>
  )
}
