'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { trackWhatsAppClick, trackCTAClick, trackEmailClick, trackOrderIntent, trackAppDownload, trackAppStoreClick } from "../lib/analytics";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Allo',
    description: 'Hyperlocal commerce platform connecting customers to neighborhood stores for instant delivery',
    url: 'https://www.allo.co.in',
    logo: 'https://www.allo.co.in/logo.png',
    image: 'https://www.allo.co.in/logo.png',
    priceRange: '₹₹',
    areaServed: [
      {
        '@type': 'Place',
        name: 'Vasant Vihar, Delhi'
      }
    ],
    serviceType: 'Hyperlocal Delivery Service'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.page}>
        <Navigation />

        <main className={styles.main}>
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Your Neighborhood,<br />
                <span className={styles.gradient}>Delivered.</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Download the Allo app and get groceries, fresh food, and essentials from your local stores delivered in minutes. 
                Supporting small-scale retailers in Vasant Vihar while giving you access to everything you need.
              </p>
              <div className={styles.heroCta}>
                <div className={styles.appButtons}>
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.allo.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.appButton}
                    onClick={() => trackAppStoreClick('android')}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div>
                      <div className={styles.appButtonLabel}>Get it on</div>
                      <div className={styles.appButtonStore}>Google Play</div>
                    </div>
                  </a>
                  <a 
                    href="https://apps.apple.com/app/allo/id123456789" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.appButton}
                    onClick={() => trackAppStoreClick('ios')}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <div>
                      <div className={styles.appButtonLabel}>Download on the</div>
                      <div className={styles.appButtonStore}>App Store</div>
                    </div>
                  </a>
                </div>
                <div className={styles.serviceArea}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Now serving Vasant Vihar</span>
                </div>
              </div>
            </div>
            <div className={styles.heroImage}>
              <Image
                src="/logo-circle.svg"
                alt="Allo - Hyperlocal Commerce"
                width={500}
                height={500}
                priority
                className={styles.heroLogo}
              />
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>Order anything in three simple steps</p>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h3>Browse the App</h3>
                <p>Download Allo and explore products from your local stores — all in one place</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h3>Place Your Order</h3>
                <p>Select what you need, choose your store, and checkout with secure payment</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h3>Delivered Fast</h3>
                <p>Your order arrives from local stores in Vasant Vihar, usually within 30 minutes</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Why Choose Allo?</h2>
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>30-Minute Promise</h3>
                <p>Not 10 minutes with a stressed rider. Real deliveries in 30 minutes from stores walking distance away.</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Your Neighborhood Uncle</h3>
                <p>The kirana that knows your family. The medical store that keeps your history. Real relationships, not algorithms.</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Simple & Fast</h3>
                <p>Browse products, place orders, and track delivery — all in one easy-to-use app designed for speed.</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 5V3M16 5V3M3 11H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Picked This Morning</h3>
                <p>Fresh vegetables from morning markets. Not warehouse stock from last week.</p>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.visionSection}`}>
            <div className={styles.visionContent}>
              <h2 className={styles.sectionTitle}>Supporting Local, Expanding Selection</h2>
              <p className={styles.visionText}>
                Today, we're delivering groceries and essentials from small-scale retailers in Vasant Vihar. 
                Tomorrow, we're bringing more neighborhoods and more categories online.
              </p>
              <div className={styles.brandGrid}>
                <span>Fashion</span>
                <span>Footwear</span>
                <span>Electronics</span>
                <span>Cosmetics</span>
                <span>Home Decor</span>
                <span>Lifestyle</span>
                <span>Accessories</span>
                <span>Wellness</span>
              </div>
              <p className={styles.visionTagline}>
                <strong>Every local store, digitally accessible. Everything you need, from shops you trust.</strong>
              </p>
              <p className={styles.visionDescription}>
                We're building the infrastructure that makes every store in your neighborhood reachable. 
                Fast delivery, wide selection, zero hassle — powered by the businesses that already exist around you.
              </p>
            </div>
          </section>

          <section className={styles.ctaSection}>
            <h2>Ready to try Allo?</h2>
            <p>Join your neighbors in Vasant Vihar who are already shopping local</p>
            <div className={styles.appButtons}>
              <a 
                href="https://play.google.com/store/apps/details?id=com.allo.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.appButton}
                onClick={() => trackAppStoreClick('android')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div>
                  <div className={styles.appButtonLabel}>Get it on</div>
                  <div className={styles.appButtonStore}>Google Play</div>
                </div>
              </a>
              <a 
                href="https://apps.apple.com/app/allo/id123456789" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.appButton}
                onClick={() => trackAppStoreClick('ios')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div>
                  <div className={styles.appButtonLabel}>Download on the</div>
                  <div className={styles.appButtonStore}>App Store</div>
                </div>
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
