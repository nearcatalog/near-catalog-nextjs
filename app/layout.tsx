import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import site from "@/config/site";
import SearchModal from "@/components/modals/search";

const manrope = Manrope({ subsets: ["latin"] });

const BASE_URL = site.url;

export const metadata: Metadata = {
  title: {
    default: "NEAR Catalog",
    template: "%s - NEAR Catalog",
  },
  description:
    "NEAR Catalog is a platform that provides a directory of NEAR projects.",
  metadataBase: new URL(BASE_URL),
  keywords: [
    "NEAR",
    "Catalog",
    "NEAR Catalog",
    "NEAR Lanscape",
    "NEAR Ecosystem",
    "NEAR Ecosystem Support",
    "NEAR Community",
    "NEAR Community Support",
    "NEAR DAO",
    "NEAR DAO Support",
  ],
  authors: [
    {
      name: "NEAR Catalog",
      url: BASE_URL,
    },
  ],
  creator: "@near",
  manifest: "/manifest.webmanifest",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body
        className={` min-h-screen bg-black font-sans antialiased`}
      >
        <div className="bg-background relative flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
          <SearchModal />
        </div>
      </body>
    </html>
  );
}
