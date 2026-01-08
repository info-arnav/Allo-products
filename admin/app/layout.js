import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
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
  title: "Allo Admin - Admin Portal",
  description:
    "Internal administration portal for Allo employees. Manage operations, orders, and business analytics.",
  keywords: "allo admin, admin portal, internal dashboard, business operations",
  authors: [{ name: "Allo" }],
  creator: "Allo",
  publisher: "Allo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://admin.allo.co.in"),
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-circle.svg",
    apple: "/logo-circle.png",
  },
  openGraph: {
    title: "Allo Admin - Admin Portal",
    description: "Internal administration portal for Allo employees",
    url: "https://admin.allo.co.in",
    siteName: "Allo Admin",
    images: [
      {
        url: "/logo-circle-128x128.png",
        width: 128,
        height: 128,
        alt: "Allo Admin Portal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Allo Admin - Admin Portal",
    description: "Internal administration portal for Allo employees",
    images: ["/logo-circle-128x128.png"],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Allo Admin",
    description: "Internal administration portal for Allo employees",
    url: "https://admin.allo.co.in",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
    </html>
  );
}
