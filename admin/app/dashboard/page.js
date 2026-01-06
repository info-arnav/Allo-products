import SessionLoader from "@/components/auth/SessionLoader";
import styles from "./dashboard.module.css";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/navigation/Navbar";

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
