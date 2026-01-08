export const metadata = {
  title: 'Privacy Policy - Allo | How We Protect Your Data',
  description: 'Learn how the Allo app protects your personal information and privacy. Details on data collection, usage, location services, and your rights for our hyperlocal delivery app.',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'privacy policy',
    'data protection',
    'Allo privacy',
    'personal information',
    'location services privacy',
    'user data rights',
    'GDPR compliance',
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
    title: 'Privacy Policy - Allo',
    description: 'Learn how Allo app protects your personal information and privacy',
    url: '/privacy',
    siteName: 'Allo',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.allo.co.in/logo-circle.png',
        width: 1024,
        height: 1024,
        alt: 'Allo Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Allo',
    description: 'Learn how Allo app protects your personal information and privacy',
    images: [
      {
        url: 'https://www.allo.co.in/logo-circle.png',
        alt: 'Allo Privacy Policy',
      },
    ],
  },
};

export default function PrivacyLayout({ children }) {
  return children;
}
