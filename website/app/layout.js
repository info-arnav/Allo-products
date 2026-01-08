import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

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
  keywords:
    "hyperlocal delivery, Vasant Vihar delivery, local store delivery, quick commerce, same day delivery Delhi, neighborhood commerce, grocery delivery app, Android iOS delivery app",
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
  openGraph: {
    title: "Allo - Local Stores Delivered",
    description:
      "Download the Allo app and shop from your local stores in Vasant Vihar. Fast delivery, wide selection, supporting small retailers.",
    url: "https://www.allo.co.in",
    siteName: "Allo",
    images: [
      {
        url: "/logo-128x128.png",
        width: 128,
        height: 128,
        alt: "Allo - Hyperlocal Commerce",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allo - Local Stores Delivered",
    description:
      "Download the app and get everything from local stores in Vasant Vihar delivered fast.",
    images: ["/logo-128x128.png"],
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/logo-circle.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo-circle-128x128.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F6B215" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER} />
        {children}
        <digiiq-chatbot agent-id="9ecd59b2-4c7c-4e7f-a7ee-7501fb493729"></digiiq-chatbot>
        <script
          src="https://www.digiiq.ai/scripts/chat-bot-widget.js"
          async
          type="text/javascript"
        ></script>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
    </html>
  );
}
