"use client";

import { useState } from "react";
import styles from "../page.module.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Privacy() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <div className={styles.legalContainer}>
          <h1 className={styles.legalTitle}>Privacy Policy</h1>
          <p className={styles.legalSubtitle}>
            You can familiarize yourself with our privacy practices, accessible
            via the headings below, and contact us if you have any questions.
          </p>
          <p className={styles.legalDate}>Last updated: January 3, 2026</p>

          <div className={styles.accordion}>
            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("personal")}
              >
                <span>Personal / Sensitive Information</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "personal" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "personal" && (
                <div className={styles.accordionContent}>
                  <h3>What We Collect</h3>
                  <p>
                    When you use Allo, we may collect personal information
                    including your name, phone number, delivery address, and
                    WhatsApp messages. This information is necessary to process
                    and deliver your orders.
                  </p>

                  <h3>How We Use It</h3>
                  <ul>
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about order status</li>
                    <li>
                      Coordinate with local stores for product availability
                    </li>
                    <li>Handle payments and delivery</li>
                    <li>Improve our service based on your preferences</li>
                  </ul>

                  <h3>Data Protection</h3>
                  <p>
                    Your personal information is stored securely and is never
                    shared with third parties except as necessary to fulfill
                    your orders (e.g., with partner stores and delivery
                    personnel). We do not sell your data to anyone.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("location")}
              >
                <span>Location and Delivery Information</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "location" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "location" && (
                <div className={styles.accordionContent}>
                  <h3>Delivery Address</h3>
                  <p>
                    We collect your delivery address to ensure orders reach you.
                    This information is shared only with the delivery personnel
                    assigned to your order and the store fulfilling it.
                  </p>

                  <h3>Service Area</h3>
                  <p>
                    Currently, we operate in Vasant Vihar, Delhi. Your location
                    data helps us determine service availability and optimize
                    delivery routes.
                  </p>

                  <h3>Location Permissions</h3>
                  <p>
                    The app may request location permissions to help you find
                    nearby stores and ensure accurate delivery. You can control
                    these permissions in your device settings. Address
                    information is only used for order delivery and is not
                    shared beyond what's necessary for fulfillment.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("nonpersonal")}
              >
                <span>Non-Personal Information</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "nonpersonal" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "nonpersonal" && (
                <div className={styles.accordionContent}>
                  <h3>Usage Data</h3>
                  <p>
                    We collect anonymous usage data to understand how people use
                    Allo, including order patterns, popular products, and
                    service times. This helps us improve the service.
                  </p>

                  <h3>Analytics</h3>
                  <p>
                    We use Google Analytics to track website visits, button
                    clicks, and general user behavior. This data is anonymized
                    and used only to improve our website and service.
                  </p>

                  <h3>Cookies</h3>
                  <p>
                    Our website uses essential cookies for functionality. We do
                    not use tracking cookies for advertising purposes.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("retention")}
              >
                <span>Data Retention</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "retention" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "retention" && (
                <div className={styles.accordionContent}>
                  <h3>How Long We Keep Your Data</h3>
                  <p>
                    Order history and delivery addresses are retained for as
                    long as you use our service. You can request deletion of
                    your data at any time by contacting us.
                  </p>

                  <h3>Deletion Requests</h3>
                  <p>
                    If you want your data deleted, email us at info@allo.co.in.
                    We'll remove your information within 30 days, except where
                    we're legally required to retain it.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("rights")}
              >
                <span>Your Rights</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "rights" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "rights" && (
                <div className={styles.accordionContent}>
                  <h3>Access and Control</h3>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access the personal data we hold about you</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Withdraw consent for data processing</li>
                  </ul>

                  <h3>Contact Us</h3>
                  <p>
                    For any privacy-related requests or questions, reach out to
                    us at info@allo.co.in
                  </p>
                </div>
              )}
            </div>

            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("changes")}
              >
                <span>Changes to This Policy</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "changes" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "changes" && (
                <div className={styles.accordionContent}>
                  <p>
                    We may update this privacy policy from time to time. When we
                    do, we'll update the "Last updated" date at the top of this
                    page. If there are significant changes, we'll notify you
                    through WhatsApp or email.
                  </p>
                  <p>
                    Continued use of Allo after changes means you accept the
                    updated policy.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.legalFooter}>
            <p>Questions about our privacy practices?</p>
            <span>Email us at </span>
            <a href="mailto:info@allo.co.in">info@allo.co.in</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
