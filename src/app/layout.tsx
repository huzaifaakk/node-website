import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CartSidebar from "@/components/CartSidebar";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Node Coffee Shop",
  description: "A premium coffee shop in Karachi, Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex flex-col min-h-screen antialiased font-sans bg-white text-node-dark overflow-x-hidden selection:bg-node-purple selection:text-white" suppressHydrationWarning>
        <SmoothScroll>
          <Navbar />
          <div className="flex-1 flex flex-col w-full">
            {children}
          </div>
          <Footer />
        </SmoothScroll>
        <CartSidebar />
      </body>
    </html>
  );
}
