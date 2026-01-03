"use client";

import Image from "next/image";
import { trackAppStoreClick } from "../../lib/analytics";
import styles from "../page.module.css";

export default function Navigation() {
  const handleDownloadClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      trackAppStoreClick("ios");
      window.open("https://apps.apple.com/app/allo/id123456789", "_blank");
    } else if (/android/i.test(userAgent)) {
      trackAppStoreClick("android");
      window.open(
        "https://play.google.com/store/apps/details?id=com.allo.app",
        "_blank"
      );
    } else {
      trackAppStoreClick("android");
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
