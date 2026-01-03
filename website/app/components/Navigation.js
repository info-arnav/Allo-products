'use client';

import Image from "next/image";
import { trackAppStoreClick } from "../../lib/analytics";
import styles from "../page.module.css";

export default function Navigation() {
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
          <a 
            href="https://play.google.com/store/apps/details?id=com.allo.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
            onClick={() => trackAppStoreClick('android')}
          >
            Download App
          </a>
        </div>
      </nav>
    </header>
  );
}
