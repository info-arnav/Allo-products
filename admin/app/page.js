"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import styles from "./page.module.css";
import SessionLoader from "@/components/auth/SessionLoader";
import NonProtectedRoute from "@/components/auth/NonProtectedRoute";
import { generateFingerPrint } from "@/components/auth/getFingerprint";
import { signInApi, signUpApi } from "@/services/fetch/client/auth";
import { validatePassword } from "@/components/auth/validatePassword";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import AddEvent from "@/components/analytics/google";
import { setCookie } from "@/components/cookies/manageCookies";

function Home() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmit(true);
    setError("");
    AddEvent("register_submitted", {
      page_path: window.location.pathname,
      page_title: document.title,
    });

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.isValid) {
      setLoading(false);
      setSubmit(false);
      setError(passwordCheck.error);
      return;
    }

    if (password != confirmPassword) {
      setLoading(false);
      setSubmit(false);
      setError("Passwords do not match");
      return;
    }

    const [fingerprint, uuid] = generateFingerPrint();
    let res = await fetch(...signUpApi(fingerprint, email, password))
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        return { error: true, message: "Internal server error" };
      });
    if (res.error) {
      setError(res.message);
      setLoading(false);
      setSubmit(false);
    } else {
      setCookie("UUID_V4", uuid);
      sessionStorage.setItem("tk", res.data.access_token);
      delete res.data.access_token;
      localStorage.setItem("uid", btoa(JSON.stringify(res.data)));
      setUser(res.data);
      router.push("/dashboard");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmit(true);
    setError("");
    AddEvent("login_submitted", {
      page_path: window.location.pathname,
      page_title: document.title,
    });
    const [fingerprint, uuid] = generateFingerPrint();
    let res = await fetch(...signInApi(fingerprint, email, password))
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        return { error: true, message: "Internal server error" };
      });
    if (res.error) {
      setError(res.message);
      setLoading(false);
      setSubmit(false);
    } else {
      setCookie("UUID_V4", uuid);
      sessionStorage.setItem("tk", res.data.access_token);
      delete res.data.access_token;
      localStorage.setItem("uid", btoa(JSON.stringify(res.data)));
      setUser(res.data);
      router.push("/dashboard");
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

          <form
            className={styles.form}
            onSubmit={isLogin ? handleLogin : handleRegister}
          >
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
            {!isLogin && (
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            {isLogin && (
              <div className={styles.formOptions}>
                <label className={styles.checkbox}>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
              </div>
            )}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading || submit}
            >
              {loading
                ? "Processing..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
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
