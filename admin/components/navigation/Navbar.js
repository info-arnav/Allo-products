"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useFetch from "../api/useFetch";
import useLogout from "../auth/useLogout";
import {
  getUserInfoApi,
  sendUserVerificationApi,
} from "@/services/useFetch/user";
import styles from "./Navbar.module.css";
import navLinks from "./data/links.json";

export default function Navbar({ children }) {
  const Fetch = useFetch();
  const logout = useLogout();
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth > 950 : true
  );

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await Fetch(...getUserInfoApi());
        if (!response.error) {
          setUserInfo(response.data);
        }
      } catch (error) {}
    };
    getUserInfo();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleResendVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Fetch(...sendUserVerificationApi());
      setVerificationSent(true);
      setTimeout(() => setVerificationSent(false), 3000);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (email) => {
    if (!email) return "A";
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className={styles["with-navbar"]}>
      {sidebarOpen && (
        <div
          className={styles["sidebar-overlay"]}
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${styles["sidebar"]} ${
          sidebarOpen ? styles["sidebar-open"] : ""
        }`}
      >
        <div className={styles["sidebar-content"]}>
          <div className={styles["sidebar-header"]}>
            <div className={styles["sidebar-logo"]}>
              <span className={styles["logo-text"]}>Allo</span>
              <span className={styles["logo-accent"]}>Admin</span>
            </div>
            <button
              className={styles["close-btn"]}
              onClick={closeSidebar}
              aria-label="Close sidebar"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className={styles["sidebar-nav"]}>
            <div className={styles["nav-section"]}>
              <div className={styles["nav-section-title"]}>NAVIGATION</div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles["nav-link"]} ${
                    pathname === link.href ? styles["active"] : ""
                  }`}
                  onClick={closeSidebar}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      <div className={styles["main-content"]}>
        <header className={styles["topbar"]}>
          <button
            className={styles["toggle-btn"]}
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <div className={styles["topbar-right"]}>
            {userInfo && (
              <div className={styles["user-profile"]}>
                <div className={styles["user-avatar"]}>
                  {getInitials(userInfo.email)}
                </div>
                <div className={styles["user-dropdown"]}>
                  <div className={styles["dropdown-content"]}>
                    <div className={styles["dropdown-user-info"]}>
                      <div className={styles["dropdown-avatar"]}>
                        {getInitials(userInfo.email)}
                      </div>
                      <div className={styles["dropdown-user-details"]}>
                        <span className={styles["dropdown-email"]}>
                          {userInfo.email}
                        </span>
                      </div>
                    </div>
                    <div className={styles["dropdown-divider"]}></div>
                    <button
                      onClick={logout}
                      className={styles["dropdown-logout"]}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {userInfo && !userInfo.verified && (
          <div className={styles["verification-banner"]}>
            <p>
              Your email isn't verified yet.{" "}
              {loading ? (
                <span>Sending...</span>
              ) : verificationSent ? (
                <span className={styles.success}>Verification email sent!</span>
              ) : (
                <a href="#" onClick={handleResendVerification}>
                  Resend Verification Email
                </a>
              )}
            </p>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
