import type { Metadata } from "next";
import { inter } from "@/config";
import "./globals.css";
import { Provider } from '@/components';

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo Shop 🛒",
    default: "Home - Teslo Shop 🛒"
  },
  description: "La mejor tienda virtual de Colombia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
