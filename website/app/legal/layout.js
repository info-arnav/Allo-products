export const metadata = {
  title: 'Terms of Service - Allo | Hyperlocal Delivery App',
  description: 'Read the terms and conditions for using Allo\'s hyperlocal delivery app. Learn about user responsibilities, service terms, and policies for orders in Vasant Vihar, Delhi.',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'terms of service',
    'terms and conditions',
    'Allo terms',
    'user agreement',
    'service policy',
    'delivery terms',
    'legal agreement',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Terms of Service - Allo',
    description: 'Terms and conditions for Allo\'s hyperlocal delivery app',
    url: '/legal',
    siteName: 'Allo',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.allo.co.in/logo-circle.png',
        width: 1024,
        height: 1024,
        alt: 'Allo Terms of Service',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service - Allo',
    description: 'Terms and conditions for Allo\'s hyperlocal delivery app',
    images: [
      {
        url: 'https://www.allo.co.in/logo-circle.png',
        alt: 'Allo Terms of Service',
      },
    ],
  },
};

export default function LegalLayout({ children }) {
  return children;
}
