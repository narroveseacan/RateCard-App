import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Spectral } from "next/font/google";
import { OfflineBanner } from "@/components/OfflineBanner";
import "./globals.css";

const pjs = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-pjs", display: "swap" });
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-spectral",
  display: "swap",
});

const themeScript = `try{var t=localStorage.getItem("pb-theme")||"dark";document.documentElement.dataset.theme=t}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Perbekasian — Fakta unik Bekasi dalam 3D", template: "%s · Perbekasian" },
  description:
    "Episode animasi 3D tentang Bekasi: Bedah Bekasi, Kata Netizen, dan Jika Bekasi Ada… Plus media kit & rate card untuk brand lokal.",
  openGraph: { siteName: "Perbekasian", locale: "id_ID", type: "website" },
};

export const viewport: Viewport = { themeColor: "#14122e", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-theme="dark" suppressHydrationWarning className={`${pjs.variable} ${spectral.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-text antialiased">
        <OfflineBanner />
        {children}
      </body>
    </html>
  );
}
