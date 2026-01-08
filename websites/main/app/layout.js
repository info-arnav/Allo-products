import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Schema from "@/components/schemas/Schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Allo - Local Stores Delivered | Hyperlocal Commerce in Vasant Vihar",
  description:
    "Download the Allo app and get everything you need from local stores in Vasant Vihar delivered in minutes. Support small-scale retailers while enjoying fast delivery. Available on Android and iOS.",
  referrer: "origin-when-cross-origin",
  keywords: [
    "hyperlocal delivery",
    "Vasant Vihar delivery",
    "local store delivery",
    "quick commerce",
    "same day delivery Delhi",
    "neighborhood commerce",
    "grocery delivery app",
    "Android iOS delivery app",
    "local kirana stores",
    "fast delivery",
    "Delhi delivery service",
  ],
  authors: [{ name: "Allo" }],
  creator: "Allo",
  publisher: "Allo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.allo.co.in"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Allo - Local Stores Delivered",
    description:
      "Download the Allo app and shop from your local stores in Vasant Vihar. Fast delivery, wide selection, supporting small retailers.",
    url: "/",
    siteName: "Allo",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.allo.co.in/logo-circle.png",
        width: 1024,
        height: 1024,
        alt: "Allo - Hyperlocal Commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Allo - Local Stores Delivered",
    description:
      "Download the app and get everything from local stores in Vasant Vihar delivered fast.",
    images: [
      {
        url: "https://www.allo.co.in/logo-circle.png",
        alt: "Allo - Hyperlocal Commerce",
      },
    ],
  },
};

const json = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Allo - Local Stores Delivered",
  url: "https://www.allo.co.in",
  applicationCategory: "ShoppingApplication",
  operatingSystem: "Android, iOS",
  description:
    "Get everything you need from local stores in Vasant Vihar delivered in minutes. Support small-scale retailers while enjoying fast delivery.",
  author: {
    "@type": "Organization",
    name: "Allo",
    url: "https://www.allo.co.in",
    logo: "https://www.allo.co.in/logo-circle.svg",
    email: "info@allo.co.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vasant Vihar",
      addressLocality: "Delhi",
      addressCountry: "IN",
      addressRegion: "Delhi",
      postalCode: "110057",
    },
  },
  offers: {
    "@type": "Offer",
    category: "Hyperlocal Delivery Service",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Schema json={json} />
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/logo-circle.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo-circle-128x128.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F6B215" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <digiiq-chatbot agent-id="9ecd59b2-4c7c-4e7f-a7ee-7501fb493729"></digiiq-chatbot>
        <script
          src="https://www.digiiq.ai/scripts/chat-bot-widget.js"
          async
          type="text/javascript"
        ></script>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
    </html>
  );
}
