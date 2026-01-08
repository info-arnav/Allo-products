import SessionLoader from "@/components/auth/SessionLoader";
import styles from "./dashboard.module.css";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/navigation/Navbar";

export const metadata = {
  title: "Dashboard | Allo Admin Portal",
  description:
    "Access your Allo Admin dashboard. View analytics, manage operations, monitor orders, and oversee business performance.",
  referrer: "origin-when-cross-origin",
  keywords: [
    "admin dashboard",
    "analytics",
    "operations dashboard",
    "business intelligence",
    "order management",
    "performance metrics",
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
    title: "Dashboard | Allo Admin Portal",
    description: "Access your Allo Admin dashboard and manage operations.",
    url: "/dashboard",
    siteName: "Allo Admin",
    locale: "en_IN",
    type: "website",
  },
};

export function Dashboard() {
  return <>hi</>;
}

export default function DashboardPage() {
  return (
    <SessionLoader>
      <ProtectedRoute>
        <Navbar>
          <Dashboard></Dashboard>
        </Navbar>
      </ProtectedRoute>
    </SessionLoader>
  );
}
