import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Human - Non-dilutive Funding Platform",
  description: "Access non-dilutive funding for your startup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full  flex flex-col bg-gray-50">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
