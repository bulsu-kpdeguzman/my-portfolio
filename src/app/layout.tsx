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
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | Full-Stack Developer`,
    template: `%s | ${site.fullName}`,
  },
  description: site.description,
  applicationName: `${site.fullName} Portfolio`,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  publisher: site.fullName,
  category: "technology",
  keywords: site.keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "eI4iIPZUCTDQOasHF6ytMXC1_tuQmlM6AjHDhrJCfBg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.fullName,
        alternateName: [site.name, "Kenjie De Guzman"],
        url: site.url,
        email: `mailto:${site.email}`,
        jobTitle: "Full-Stack Developer",
        description: site.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Candaba",
          addressRegion: "Pampanga",
          addressCountry: "PH",
        },
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: site.university,
        },
        sameAs: [site.github, site.linkedin],
        knowsAbout: [
          "Full-stack web development",
          "Backend architecture",
          "REST APIs",
          "React.js",
          "Next.js",
          "Laravel",
          "MySQL",
          "Artificial intelligence applications",
          "Retrieval-Augmented Generation",
          "Docker",
          "CI/CD",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "IT Specialist — Java",
            credentialCategory: "Certification",
            recognizedBy: { "@type": "Organization", name: "Certiport" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Google AI Professional Certificate",
            credentialCategory: "Professional Certificate",
            recognizedBy: { "@type": "Organization", name: "Google" },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: `${site.fullName} Portfolio`,
        description: site.description,
        inLanguage: "en-PH",
        author: { "@id": `${site.url}/#person` },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
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
