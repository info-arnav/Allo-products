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
  title: "Allo - Local Stores Delivered | Hyperlocal E-Commerce Platform",
  description:
    "Order from local stores in Greater Kailash and Vasant Vihar, Delhi. Fast delivery of groceries, essentials, and more. Supporting small retailers with our hyperlocal e-commerce platform. Download the Allo app on Android and iOS.",
  referrer: "origin-when-cross-origin",
  keywords: [
    "hyperlocal delivery Delhi",
    "Greater Kailash delivery",
    "Vasant Vihar delivery",
    "local store ecommerce",
    "quick commerce Delhi",
    "same day delivery",
    "neighborhood ecommerce",
    "online grocery Delhi",
    "local shopping app",
    "kirana store delivery",
    "fast delivery Delhi",
    "GK2 delivery",
    "hyperlocal ecommerce platform",
  ],
  authors: [{ name: "Allo" }],
  creator: "Allo",
  publisher: "Allo",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://www.allo.co.in"),
  alternates: {
    canonical: "/",
  },
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Allo - Local Stores Delivered | Hyperlocal E-Commerce",
    description:
      "Order from local stores in Greater Kailash & Vasant Vihar. Fast delivery, wide selection, supporting small retailers. Download the Allo app now.",
    url: "/",
    siteName: "Allo",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.allo.co.in/logo-circle.png",
        width: 1024,
        height: 1024,
        alt: "Allo - Hyperlocal E-Commerce Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@allo2026",
    creator: "@allo2026",
    title: "Allo - Local Stores Delivered",
    description:
      "Order from local stores in GK2 & Vasant Vihar. Fast delivery supporting small retailers. Download now!",
    images: [
      {
        url: "https://www.allo.co.in/logo-circle.png",
        alt: "Allo - Hyperlocal E-Commerce",
      },
    ],
  },
};

const json = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.allo.co.in/#organization",
  name: "Allo",
  legalName: "Allo",
  url: "https://www.allo.co.in",
  logo: "https://www.allo.co.in/logo-circle.png",
  image: "https://www.allo.co.in/logo-circle.png",
  description:
    "Hyperlocal e-commerce platform connecting customers with local stores in Delhi. Fast delivery from neighborhood retailers.",
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
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8800716273",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "28.5494",
      longitude: "77.2001",
    },
    geoRadius: "5000",
  },
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Hyperlocal Delivery Service",
      description:
        "Fast delivery from local stores including groceries, essentials, and more",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Schema json={json} />
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
