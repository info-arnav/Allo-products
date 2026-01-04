"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";
import SessionLoader from "@/components/auth/SessionLoader";
import NonProtectedRoute from "@/components/auth/NonProtectedRoute";

function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@allo.co.in")) {
      setError("Only @allo.co.in email addresses are allowed");
      return;
    }

    // TODO: Implement API call for authentication
    if (isLogin) {
      // Login logic
    } else {
      // Signup logic
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.branding}>
          <Image
            src="/logo-circle.svg"
            alt="Allo Logo"
            width={64}
            height={64}
            priority
          />
          <h1 className={styles.brandTitle}>Allo Admin</h1>
          <p className={styles.brandSubtitle}>Admin Portal</p>
        </div>
        <div className={styles.description}>
          <p>
            Manage orders, track inventory, and monitor business operations for
            Allo's hyperlocal delivery platform.
          </p>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className={styles.formSubtitle}>Access the Allo admin portal</p>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            {!isLogin && (
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="you@allo.co.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isLogin && (
              <div className={styles.formOptions}>
                <label className={styles.checkbox}>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className={styles.forgotLink}>
                  Forgot password?
                </a>
              </div>
            )}
            <button type="submit" className={styles.submitButton}>
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className={styles.formFooter}>
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                type="button"
                className={styles.switchButton}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          <div className={styles.securityNote}>
            <p>For authorized Allo employees only</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <SessionLoader noLoading={true}>
      <NonProtectedRoute>
        <Home></Home>
      </NonProtectedRoute>
    </SessionLoader>
  );
}
