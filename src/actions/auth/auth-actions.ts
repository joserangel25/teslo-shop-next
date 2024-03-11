'use server'

// import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs'
import { signIn, signOut } from '@/auth.config';
import prisma from '@/lib/prisma';
import { sleep } from '@/utils';

// ...

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    // await sleep(2)
    await signIn('credentials', {
      redirect: false,
      // redirectTo: 'http://localhost:3000',
      ...Object.fromEntries(formData)
    });

    return 'Success'
  } catch (error) {
    console.log(error)
    // return "invalid credentials"
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    // throw error;
  }
}

export const login = async ({ email, password }: { email: string, password: string }) => {
  try {
    await signIn('credentials', { email, password })
    return { ok: true }
  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}

export const logOutSession = async () => {
  await signOut()
}

interface IDataRegister {
  name: string;
  email: string;
  password: string
}

export const registerNewUser = async ({ email, name, password }: IDataRegister) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: bcrypt.hashSync(password)
      },
      select: {
        name: true,
        email: true,
        id: true
      }
    })

    return {
      ok: true,
      user
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo crear al usuario'
    }
  }
}