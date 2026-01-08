"use client";

import Link from "next/link";
import styles from "./error.module.css";

export default function NotFound() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>Page Not Found</h2>
        <p className={styles.errorDescription}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className={styles.errorActions}>
          <Link href="/" className={styles.primaryButton}>
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className={styles.secondaryButton}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
