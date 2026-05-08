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
    default: "Landman Auctions | Texas Land Auction Specialists",
    template: "%s | Landman Auctions",
  },
  description:
    "Craig Meier — World Champion Auctioneer. Specializing in Texas farm, ranch, and land auctions in North Texas and Ellis County.",
  keywords: [
    "Texas land auction",
    "land auctioneer Texas",
    "sell land Texas",
    "Craig Meier auctioneer",
    "ranch auction Texas",
    "farm land auction",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Landman Auctions | Texas Land Auction Specialists",
    description:
      "Craig Meier — World Champion Auctioneer. Specializing in Texas farm, ranch, and land auctions in North Texas and Ellis County.",
    siteName: "Landman Auctions",
    type: "website",
    images: [
      {
        url: "/images/landman-logo-wide.png",
        width: 1200,
        height: 630,
        alt: "Landman Auctions",
      },
    ],
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
