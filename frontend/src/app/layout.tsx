import type { Metadata } from "next";

import { Montserrat } from "next/font/google";

import Link from "next/link";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SWStarter",
  description: "SWStarter Take Home Exercise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <header className="py-[7px] fixed w-full flex items-center justify-center bg-background shadow-[0_1px_0_0_var(--color-green-teal)]">
          <h1 className="text-[9px] font-bold text-green-teal-2">
            <Link href="/">SWStarter</Link>
          </h1>
        </header>

        <main className="py-[28px] bg-[#ededed] min-h-screen">{children}</main>
      </body>
    </html>
  );
}
