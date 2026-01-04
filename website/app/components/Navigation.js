"use client";

import Image from "next/image";
import styles from "../page.module.css";
import { AddEvent } from "@/components/analytics/google";

export default function Navigation() {
  const handleDownloadClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      AddEvent("app_store_click", { platform: "ios", location: "nav" });
      window.open("https://apps.apple.com/app/allo/id123456789", "_blank");
    } else if (/android/i.test(userAgent)) {
      AddEvent("app_store_click", { platform: "android", location: "nav" });
      window.open(
        "https://play.google.com/store/apps/details?id=com.allo.app",
        "_blank"
      );
    } else {
      AddEvent("app_store_click", { platform: "android", location: "nav" });
      window.open(
        "https://play.google.com/store/apps/details?id=com.allo.app",
        "_blank"
      );
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <a href="/">
            <Image
              src="/logo-circle.svg"
              alt="Allo Logo"
              width={50}
              height={50}
              priority
              className={styles.navLogo}
            />
          </a>
          <button className={styles.ctaButton} onClick={handleDownloadClick}>
            Download App
          </button>
        </div>
      </nav>
    </header>
  );
}
