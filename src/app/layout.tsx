import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/utils";
import "../styles/globals.css";
import { siteConfig } from "@/utils/siteConfig";
import { Providers } from "./Providers";
import { headers } from "next/headers";
import { cookieToInitialState } from "@account-kit/core";
import { alchemyConfig } from "../config/alchemy";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "yushaku",
      url: "https://yushaku.vercel.app",
    },
  ],
  creator: "yushaku",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@yushaku",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Persist state across pages
  // https://www.alchemy.com/docs/wallets/react/ssr#persisting-the-account-state
  const initialState = cookieToInitialState(
    alchemyConfig,
    (await headers()).get("cookie") ?? undefined
  );

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-svh overflow-x-hidden font-sans antialiased",
          inter.variable
        )}
        suppressHydrationWarning
      >
        <Providers initialState={initialState}>{children}</Providers>
        <Toaster position='top-center' reverseOrder={false} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
