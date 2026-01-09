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
  title: "Allo Admin - Admin Portal | Operations Management",
  description:
    "Secure admin portal for managing Allo's hyperlocal commerce platform. Access analytics, user management, order operations, and system configuration.",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Allo Admin",
    "Admin Portal",
    "Operations Management",
    "Dashboard",
    "Analytics",
    "User Management",
    "Order Management",
    "System Administration",
    "Business Intelligence",
  ],
  authors: [{ name: "Allo" }],
  creator: "Allo",
  publisher: "Allo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Allo Admin Portal",
    description:
      "Secure admin portal for managing Allo's hyperlocal commerce platform.",
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
    title: "Allo Admin Portal",
    description:
      "Secure admin portal for managing Allo's hyperlocal commerce platform.",
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
  "@type": "WebApplication",
  name: "Allo Admin Portal",
  url: "https://admin.allo.co.in",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  description:
    "Administrative portal for managing Allo's hyperlocal commerce platform.",
  author: {
    "@type": "Organization",
    name: "Allo",
    url: "https://www.allo.co.in",
    logo: "https://admin.allo.co.in/logo-circle.svg",
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
    category: "Enterprise Software",
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
