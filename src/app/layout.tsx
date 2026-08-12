import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import PaletteProvider from "@/components/PaletteProvider";
import TerminalBackground from "@/components/TerminalBackground";
import "./globals.css";
import { site } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: site.name + " — " + site.tagline,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg font-sans text-text lg:pl-56">
        <TerminalBackground />
        <PaletteProvider>
          <Sidebar />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </PaletteProvider>
      </body>
    </html>
  );
}
