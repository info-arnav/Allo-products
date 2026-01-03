"use client";

import { useState } from "react";
import styles from "../page.module.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Legal() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <div className={styles.legalContainer}>
          <h1 className={styles.legalTitle}>Terms of Service</h1>
          <p className={styles.legalSubtitle}>
            Please read these terms carefully before using Allo's services.
          </p>
          <p className={styles.legalDate}>Last updated: January 3, 2026</p>

          <div className={styles.accordion}>
            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("acceptance")}
              >
                <span>Acceptance of Terms</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "acceptance" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "acceptance" && (
                <div className={styles.accordionContent}>
                  <p>
                    By using Allo's mobile application and services, you agree
                    to these terms. If you don't agree, please don't use our
                    service.
                  </p>
                  <p>
                    Allo operates as a hyperlocal delivery platform through our
                    Android and iOS apps. We reserve the right to modify or
                    discontinue services at any time.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("service")}
              >
                <span>Service Description</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "service" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "service" && (
                <div className={styles.accordionContent}>
                  <h3>What We Offer</h3>
                  <p>
                    Allo connects you to local small-scale retailers and
                    neighborhood shops for home delivery of groceries,
                    essentials, and other products through our mobile app. We
                    act as an intermediary between you and local businesses.
                  </p>

                  <h3>Service Areas</h3>
                  <p>Currently available in: Vasant Vihar, Delhi.</p>

                  <h3>How It Works</h3>
                  <ul>
                    <li>Download the Allo app from Google Play or App Store</li>
                    <li>Browse products from local stores in your area</li>
                    <li>Place your order with secure payment options</li>
                    <li>Track delivery in real-time through the app</li>
                  </ul>

                  <h3>Service Quality</h3>
                  <p>
                    We work to ensure product availability and timely delivery.
                    Actual delivery times may vary based on store availability,
                    distance, and demand.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("orders")}
              >
                <span>Orders and Payments</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "orders" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "orders" && (
                <div className={styles.accordionContent}>
                  <h3>Placing Orders</h3>
                  <p>
                    Orders are placed through the Allo mobile app. We'll confirm
                    availability and provide real-time updates. An order is
                    confirmed once payment is processed successfully.
                  </p>

                  <h3>Pricing</h3>
                  <p>
                    Prices are determined by the partner store and may include a
                    delivery fee. All prices are displayed in the app before
                    checkout.
                  </p>

                  <h3>Payment Methods</h3>
                  <p>
                    We accept UPI, credit/debit cards, and other digital payment
                    methods through our secure payment gateway.
                  </p>

                  <h3>Cancellations</h3>
                  <p>
                    You can cancel an order before it's dispatched through the
                    app. Once dispatched, cancellations may not be possible.
                    Refunds are processed according to our refund policy.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("delivery")}
              >
                <span>Delivery</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "delivery" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "delivery" && (
                <div className={styles.accordionContent}>
                  <h3>Delivery Times</h3>
                  <p>
                    We aim to deliver within 30 minutes but cannot guarantee
                    exact timing. Actual delivery time depends on store
                    availability, distance, and current demand. You can track
                    your order in real-time through the app.
                  </p>

                  <h3>Delivery Area</h3>
                  <p>
                    Delivery is available only within our service areas in
                    Vasant Vihar. We may decline orders outside these zones.
                  </p>

                  <h3>Receiving Orders</h3>
                  <p>
                    Someone must be available at the delivery address to receive
                    the order. If no one is available, we may leave the order at
                    your doorstep or return it to the store based on the
                    situation.
                  </p>

                  <h3>Quality Issues</h3>
                  <p>
                    If you receive damaged or incorrect items, contact us
                    immediately through the app. We'll work with the store to
                    resolve the issue promptly.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("responsibilities")}
              >
                <span>User Responsibilities</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "responsibilities" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "responsibilities" && (
                <div className={styles.accordionContent}>
                  <h3>Accurate Information</h3>
                  <p>
                    You must provide accurate delivery addresses and contact
                    information. We're not responsible for failed deliveries due
                    to incorrect information.
                  </p>

                  <h3>Prohibited Use</h3>
                  <p>You may not:</p>
                  <ul>
                    <li>Order illegal or prohibited items</li>
                    <li>Use the service to harm others</li>
                    <li>Abuse or harass delivery personnel or store staff</li>
                    <li>Attempt to defraud Allo or partner stores</li>
                  </ul>

                  <h3>Age Restrictions</h3>
                  <p>
                    Some products (alcohol, tobacco) have age restrictions. You
                    must be of legal age to order such items and may be required
                    to show ID upon delivery.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("liability")}
              >
                <span>Limitation of Liability</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "liability" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "liability" && (
                <div className={styles.accordionContent}>
                  <h3>Service As-Is</h3>
                  <p>
                    Allo is provided "as is" during this POC phase. We make no
                    warranties about service availability, reliability, or
                    quality.
                  </p>

                  <h3>Product Quality</h3>
                  <p>
                    Products are sourced from partner stores. While we work with
                    trusted businesses, we're not liable for product quality
                    issues beyond facilitating resolution with the store.
                  </p>

                  <h3>Limitation</h3>
                  <p>
                    To the maximum extent permitted by law, Allo's liability is
                    limited to the order value. We're not liable for indirect,
                    incidental, or consequential damages.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("changes")}
              >
                <span>Changes to Terms</span>
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
                    We may update these terms at any time. Changes will be
                    posted here with an updated date. Continued use of the
                    service means you accept the new terms.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleSection("contact")}
              >
                <span>Contact & Disputes</span>
                <span
                  className={`${styles.accordionIcon} ${
                    openSection === "contact" ? styles.open : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openSection === "contact" && (
                <div className={styles.accordionContent}>
                  <h3>Questions or Issues</h3>
                  <p>
                    For questions about these terms or to resolve disputes,
                    contact us at info@allo.co.in or via WhatsApp.
                  </p>

                  <h3>Governing Law</h3>
                  <p>
                    These terms are governed by the laws of India. Any disputes
                    will be subject to the jurisdiction of courts in Delhi.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.legalFooter}>
            <p>Questions about these terms?</p>
            <span>Email us at </span>
            <a href="mailto:info@allo.co.in">info@allo.co.in</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
