import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Craig Meier Land Auctions | Texas Land Auction Specialist",
    template: "%s | Craig Meier Land Auctions",
  },
  description:
    "Craig Meier is a World Champion Auctioneer with 25+ years of Texas land auction experience. If you're considering selling your land, schedule a consultation today.",
  keywords: [
    "Texas land auction",
    "land auctioneer Texas",
    "sell land Texas",
    "Craig Meier auctioneer",
    "ranch auction Texas",
    "farm land auction",
  ],
  openGraph: {
    siteName: "Craig Meier Land Auctions",
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
      <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
        <body className="bg-offwhite text-shadow font-sans antialiased">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
