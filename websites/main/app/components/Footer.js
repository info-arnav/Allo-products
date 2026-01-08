"use client";

import Image from "next/image";
import styles from "../page.module.css";
import { AddEvent } from "@/components/analytics/google";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerBrand}>
          <Image
            src="/logo-circle.svg"
            alt="Allo Logo"
            width={80}
            height={80}
          />
          <p>Making your neighborhood your marketplace</p>
        </div>
        <div className={styles.footerLinks}>
          <div>
            <h4>Service Areas</h4>
            <ul>
              <li>Vasant Vihar</li>
            </ul>
          </div>
          <div>
            <h4>Download App</h4>
            <ul>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.allo.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    AddEvent("app_store_click", {
                      platform: "android",
                      location: "footer",
                    })
                  }
                >
                  Android App
                </a>
              </li>
              <li>
                <a
                  href="https://apps.apple.com/app/allo/id123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    AddEvent("app_store_click", {
                      platform: "ios",
                      location: "footer",
                    })
                  }
                >
                  iOS App
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/legal">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Allo. All rights reserved.</p>
      </div>
    </footer>
  );
}
