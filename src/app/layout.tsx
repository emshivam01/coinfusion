import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner"; // sonner toaster via shadcn
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import StoreProvider from "@/redux/StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "Coinfusion",
  description: "Cryptocurrency portfolio tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Toaster />
            {/* <div className="hidden md:block"></div> */}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
