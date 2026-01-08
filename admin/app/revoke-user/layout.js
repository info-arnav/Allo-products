export const metadata = {
  title: "Revoke User Access | Allo Admin",
  description:
    "Report unauthorized use of your @allo.co.in email and revoke access to protect your account.",
  referrer: "origin-when-cross-origin",
  keywords: [
    "revoke access",
    "unauthorized access",
    "account security",
    "Allo admin security",
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
    title: "Revoke User Access | Allo Admin",
    description: "Report unauthorized use and revoke access to protect your account.",
    url: "/revoke-user",
    siteName: "Allo Admin",
    locale: "en_IN",
    type: "website",
  },
};

export default function RevokeUser({ children }) {
  return children;
}
