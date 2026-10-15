import { Archivo, Geist_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";

import SiteProvider from "@/components/site-provider";
import Preloader from "@/components/preloader";
import Navigation from "@/components/navigation";
import ProjectDetail from "@/components/project-detail";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://frame-studio.example"),
  title: {
    default: "FRAME | Cinematic Production Studio",
    template: "%s | FRAME",
  },
  description:
    "FRAME is an independent creative production studio making cinematic commercials, brand films, fashion campaigns and social content.",
  keywords: [
    "production studio",
    "brand films",
    "commercial production",
    "creative direction",
    "fashion film",
  ],
  openGraph: {
    title: "FRAME | Cinematic Production Studio",
    description:
      "We make brands impossible to ignore. Independent creative production studio.",
    type: "website",
    images: [{ url: "/media/hero-film-set.jpg", width: 2600, height: 1733 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${interTight.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <body className="grain min-h-screen bg-void antialiased">
        <SiteProvider>
          <a
            href="#main"
            className="label sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[130] focus:border focus:border-lime focus:bg-void focus:px-4 focus:py-3 focus:text-lime"
          >
            Skip to content
          </a>
          <Preloader />
          <Navigation />
          <main id="main">{children}</main>
          <ProjectDetail />
        </SiteProvider>
      </body>
    </html>
  );
}
