'use client'

import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

interface Props {
  children: React.ReactNode
}

export const Provider = ({ children }: Props) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID_PAYPAL ?? '',
        intent: 'capture',
        currency: 'USD'
      }}
    >
      <SessionProvider>
        {children}
      </SessionProvider>
    </PayPalScriptProvider>

  )
}
