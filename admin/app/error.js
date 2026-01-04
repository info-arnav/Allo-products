"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <p className={styles.errorCode}>500</p>
        <h1 className={styles.errorTitle}>Something went wrong</h1>
        <p className={styles.errorDescription}>
          An unexpected error occurred. Please try again.
        </p>
        <div className={styles.errorActions}>
          <button onClick={() => reset()} className={styles.primaryButton}>
            Try again
          </button>
          <Link href="/" className={styles.secondaryButton}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
