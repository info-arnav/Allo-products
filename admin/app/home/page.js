import styles from "./home.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Allo Admin</span>
          </div>
          <div className={styles.userMenu}>
            <span className={styles.userName}>Employee</span>
            <button className={styles.logoutButton}>Sign Out</button>
          </div>
        </div>
      </nav>

      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <a href="#" className={styles.menuItem}>
            <span className={styles.menuIcon}>📊</span>
            <span>Dashboard</span>
          </a>
          <a href="#" className={styles.menuItem}>
            <span className={styles.menuIcon}>📦</span>
            <span>Orders</span>
          </a>
          <a href="#" className={styles.menuItem}>
            <span className={styles.menuIcon}>🏪</span>
            <span>Stores</span>
          </a>
          <a href="#" className={styles.menuItem}>
            <span className={styles.menuIcon}>👥</span>
            <span>Customers</span>
          </a>
          <a href="#" className={styles.menuItem}>
            <span className={styles.menuIcon}>📈</span>
            <span>Analytics</span>
          </a>
          <a href="#" className={styles.menuItem}>
            <span className={styles.menuIcon}>⚙️</span>
            <span>Settings</span>
          </a>
        </aside>

        <main className={styles.content}>
          <header className={styles.pageHeader}>
            <h1>Dashboard</h1>
            <p className={styles.pageSubtitle}>Welcome to Allo Admin Portal</p>
          </header>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📦</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>0</div>
                <div className={styles.statLabel}>Active Orders</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🏪</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>0</div>
                <div className={styles.statLabel}>Partner Stores</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>👥</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>0</div>
                <div className={styles.statLabel}>Total Customers</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>💰</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>₹0</div>
                <div className={styles.statLabel}>Revenue Today</div>
              </div>
            </div>
          </div>

          <div className={styles.recentSection}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <div className={styles.emptyState}>
              <p>No recent activity</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
