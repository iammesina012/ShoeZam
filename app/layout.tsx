import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShoeZam",
  description: "Footwear E-Commerce Web Application",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${montserrat.className} min-h-full flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
