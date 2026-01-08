"use strict";
require("dotenv").config();
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Configuration from environment
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.DB_PORT || 5432,
};

// Backup directory
const BACKUP_DIR = path.join(__dirname, "..", "backups");

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

/**
 * Create a PostgreSQL database backup
 */
async function backupDatabase() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = path.join(
    BACKUP_DIR,
    `backup-${dbConfig.database}-${timestamp}.sql`
  );

  console.log(`Starting database backup...`);
  console.log(`Database: ${dbConfig.database}`);
  console.log(`Backup file: ${backupFile}`);

  // Set PGPASSWORD environment variable for pg_dump
  const env = {
    ...process.env,
    PGPASSWORD: dbConfig.password,
  };

  const command = `pg_dump -h ${dbConfig.host} -p ${dbConfig.port} -U ${dbConfig.user} -d ${dbConfig.database} -F p -f "${backupFile}"`;

  return new Promise((resolve, reject) => {
    exec(command, { env }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Backup failed: ${error.message}`);
        return reject(error);
      }

      if (stderr) {
        console.log(`pg_dump output: ${stderr}`);
      }

      // Check if file was created and has content
      if (fs.existsSync(backupFile)) {
        const stats = fs.statSync(backupFile);
        console.log(
          `Backup completed successfully! Size: ${(
            stats.size /
            1024 /
            1024
          ).toFixed(2)} MB`
        );
        console.log(`Backup location: ${backupFile}`);
        resolve(backupFile);
      } else {
        reject(new Error("Backup file was not created"));
      }
    });
  });
}

/**
 * Clean up old backups (keep last N backups)
 */
function cleanupOldBackups(keepCount = 10) {
  console.log(`\nCleaning up old backups (keeping last ${keepCount})...`);

  const files = fs
    .readdirSync(BACKUP_DIR)
    .filter((file) => file.startsWith("backup-") && file.endsWith(".sql"))
    .map((file) => ({
      name: file,
      path: path.join(BACKUP_DIR, file),
      time: fs.statSync(path.join(BACKUP_DIR, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time);

  if (files.length > keepCount) {
    const filesToDelete = files.slice(keepCount);
    filesToDelete.forEach((file) => {
      fs.unlinkSync(file.path);
      console.log(`Deleted old backup: ${file.name}`);
    });
    console.log(`Cleaned up ${filesToDelete.length} old backup(s)`);
  } else {
    console.log(`No cleanup needed. Current backups: ${files.length}`);
  }
}

/**
 * Main execution
 */
async function main() {
  try {
    // Create backup
    await backupDatabase();

    // Cleanup old backups
    cleanupOldBackups(10);

    console.log("\nBackup process completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\nBackup process failed:", error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { backupDatabase, cleanupOldBackups };
