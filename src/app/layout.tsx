import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PaletteProvider from "@/components/PaletteProvider";
import ThemeProvider from "@/components/ThemeProvider";
import SoundProvider from "@/components/SoundProvider";
import SnakeProvider from "@/components/SnakeProvider";
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
  verification: {
    google: "eI4iIPZUCTDQOasHF6ytMXC1_tuQmlM6AjHDhrJCfBg",
  },
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('theme');var r=m==='light'?'light':m==='dark'?'dark':(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=r;}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg font-sans text-text lg:pl-68">
        <TerminalBackground />
        <ThemeProvider>
          <SoundProvider>
            <SnakeProvider>
              <PaletteProvider>
                <Sidebar />
                <Navbar />
                <main className="relative z-10 flex-1">{children}</main>
              </PaletteProvider>
            </SnakeProvider>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
