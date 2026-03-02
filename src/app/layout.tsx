import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Landman | Texas Ranch & Land For Sale",
    template: "%s | Landman",
  },
  description:
    "Landman specializes in Texas ranch, farm, hunting, and recreational land sales. Rooted in Texas Land.",
  keywords: ["Texas ranch for sale", "Texas land for sale", "ranch real estate", "hunting land Texas"],
  openGraph: {
    siteName: "Landman",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
        <body className="bg-brand-dark text-brand-off-white font-sans antialiased">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
