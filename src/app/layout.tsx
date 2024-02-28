import type { Metadata } from "next";
import { inter } from "@/config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo Shop 🛒",
    default: "- Teslo Shop 🛒"
  },
  description: "La mejor tienda virtual de Colombia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
