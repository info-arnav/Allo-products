"use client";

import SessionLoader from "@/components/auth/SessionLoader";
import { revokeUserApi } from "@/services/fetch/client/auth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import styles from "./revoke.module.css";

export function RevokeUser() {
  const searchParams = useSearchParams();

  const user = searchParams.get("user") ?? null;
  const code = searchParams.get("code") ?? null;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const revoke = async () => {
      await fetch(...revokeUserApi(user, code))
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setLoading(false);
            setError("Revocation Failed.");
          } else {
            setLoading(false);
            setSuccess(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          setError("Revocation Failed.");
        });
    };
    revoke();
  }, []);

  return (
    <SessionLoader>
      <div className={styles.container}>
        {loading && (
          <div
            className={styles.loader}
            role="status"
            aria-live="polite"
            aria-label="Revoking"
          >
            <div className={styles.spinner} aria-hidden="true"></div>
            <h3 className={styles.title}>Revoking access...</h3>
          </div>
        )}
        {error && (
          <div className={styles.loader}>
            <h3 className={styles.title}>Revocation Failed</h3>
            <p className={`${styles.message} ${styles.errorMessage}`}>
              Unable to revoke access. Please try again.
            </p>
          </div>
        )}
        {success && (
          <div className={styles.loader}>
            <h3 className={styles.title}>Revocation Successful</h3>
            <p className={`${styles.message} ${styles.successMessage}`}>
              Access has been successfully revoked.
            </p>
          </div>
        )}
      </div>
    </SessionLoader>
  );
}

export default function RevokeUserWithSuspense() {
  return (
    <Suspense fallback={<div></div>}>
      <RevokeUser />
    </Suspense>
  );
}
