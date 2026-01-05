"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useFetch from "../api/useFetch";
import useLogout from "../auth/useLogout";
import {
  getUserInfoApi,
  sendUserVerificationApi,
} from "@/services/useFetch/user";
import styles from "./Navbar.module.css";
import navLinks from "./data/links.json";

export default function Navbar() {
  const Fetch = useFetch();
  const logout = useLogout();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles["navbar-container"]}>
          <div className={styles["navbar-brand"]}>
            <Link href="/dashboard">Allo Admin</Link>
          </div>

          <button
            className={styles["hamburger"]}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div
            className={`${styles["navbar-menu"]} ${
              mobileMenuOpen ? styles["mobile-open"] : ""
            }`}
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={styles["navbar-link"]}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <div className={styles["mobile-user-section"]}>
              {userInfo && (
                <span className={styles["mobile-user-email"]}>
                  {userInfo.email}
                </span>
              )}
              <button onClick={logout} className={styles["mobile-logout-btn"]}>
                Logout
              </button>
            </div>
          </div>

          <div className={styles["navbar-right"]}>
            {userInfo && (
              <span className={styles["user-email"]}>{userInfo.email}</span>
            )}
            <button onClick={logout} className={styles["logout-btn"]}>
              Logout
            </button>
          </div>
        </div>
      </nav>

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
    </>
  );
}
