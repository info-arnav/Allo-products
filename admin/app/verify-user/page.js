"use client";

import SessionLoader from "@/components/auth/SessionLoader";
import { verifyUserApi } from "@/services/fetch/client/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import styles from "./verify.module.css";

export function VerifyUser() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const user = searchParams.get("user") ?? null;
  const code = searchParams.get("code") ?? null;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verify = async () => {
      await fetch(...verifyUserApi(user, code))
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setLoading(false);
            setError("Verification Failed.");
          } else {
            setError(false);
            router.replace("/dashboard");
          }
        })
        .catch((err) => {
          setLoading(false);
          setError("Verification Failed.");
        });
    };
    verify();
  }, []);

  return (
    <SessionLoader>
      <div className={styles.container}>
        {loading && (
          <div
            className={styles.loader}
            role="status"
            aria-live="polite"
            aria-label="Verifying"
          >
            <div className={styles.spinner} aria-hidden="true"></div>
            <h3 className={styles.title}>Verifying your email...</h3>
          </div>
        )}
        {error && (
          <div className={styles.loader}>
            <div className={`${styles.icon} ${styles.errorIcon}`}>×</div>
            <h3 className={styles.title}>Verification Failed</h3>
            <p className={`${styles.message} ${styles.errorMessage}`}>
              New verification code has been sent to your email.
            </p>
          </div>
        )}
      </div>
    </SessionLoader>
  );
}

export default function VerifyUserWithSuspense() {
  return (
    <Suspense fallback={<div></div>}>
      <VerifyUser />
    </Suspense>
  );
}
