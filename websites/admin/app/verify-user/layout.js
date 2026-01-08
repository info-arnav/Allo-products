export const metadata = {
  title: "Verify Your Email | Allo Admin",
  description:
    "Confirm your @allo.co.in email address to securely access your Allo Admin dashboard.",
  referrer: "origin-when-cross-origin",
  keywords: [
    "email verification",
    "account verification",
    "Allo admin access",
    "secure login",
  ],
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
    title: "Verify Your Email | Allo Admin",
    description: "Confirm your email address to securely access your Allo Admin dashboard.",
    url: "/verify-user",
    siteName: "Allo Admin",
    locale: "en_IN",
    type: "website",
  },
};

export default function VerifyUser({ children }) {
  return children;
}
