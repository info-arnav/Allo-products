"use client";

import Link from "next/link";
import styles from "./error.module.css";

export default function NotFound() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <p className={styles.errorCode}>404</p>
        <h1 className={styles.errorTitle}>Page not found</h1>
        <p className={styles.errorDescription}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className={styles.primaryButton}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
