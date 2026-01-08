"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css";

export default function Error({ error, reset }) {
  useEffect(() => {}, [error]);

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorCode}>500</h1>
        <h2 className={styles.errorTitle}>Something Went Wrong</h2>
        <p className={styles.errorDescription}>
          We're sorry, but something unexpected happened. Please try again.
        </p>
        <div className={styles.errorActions}>
          <button onClick={() => reset()} className={styles.primaryButton}>
            Try Again
          </button>
          <Link href="/" className={styles.secondaryButton}>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
