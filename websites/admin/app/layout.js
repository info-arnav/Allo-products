import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
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
  title: "Allo Admin - Operations Dashboard | E-Commerce Management",
  description:
    "Admin portal for managing Allo's hyperlocal e-commerce platform. Access real-time analytics, user management, order operations, inventory tracking, and system configuration for Greater Kailash & Vasant Vihar operations.",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Allo Admin",
    "Operations Dashboard",
    "E-commerce Admin Panel",
    "Hyperlocal Management",
    "Order Management System",
    "Inventory Management",
    "Analytics Dashboard",
    "Business Intelligence",
    "Delivery Operations",
    "Merchant Management",
  ],
  authors: [{ name: "Allo" }],
  creator: "Allo",
  publisher: "Allo",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://admin.allo.co.in"),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/logo-circle.svg", type: "image/svg+xml" },
    ],
    apple: "/logo-circle-128x128.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Allo Admin - Operations Dashboard",
    description:
      "Admin portal for managing Allo's hyperlocal e-commerce platform with real-time analytics and operations management.",
    url: "/",
    siteName: "Allo Admin",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://admin.allo.co.in/logo-circle.png",
        width: 1024,
        height: 1024,
        alt: "Allo Admin Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@allo2026",
    creator: "@allo2026",
    title: "Allo Admin - Operations Dashboard",
    description:
      "Admin portal for managing Allo's hyperlocal e-commerce operations.",
    images: [
      {
        url: "https://admin.allo.co.in/logo-circle.png",
        alt: "Allo Admin Portal",
      },
    ],
  },
};

const json = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Allo Admin Portal",
  url: "https://admin.allo.co.in",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  description:
    "Administrative dashboard for managing Allo's hyperlocal e-commerce platform operations.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  author: {
    "@type": "Organization",
    name: "Allo",
    url: "https://www.allo.co.in",
    logo: "https://admin.allo.co.in/logo-circle.png",
    email: "info@allo.co.in",
    telephone: "+91-8800716273",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Greater Kailash 2",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110048",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/allo.co.in/",
      "https://www.linkedin.com/company/111218968/",
      "https://x.com/allo2026/",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Schema json={json} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
    </html>
  );
}
