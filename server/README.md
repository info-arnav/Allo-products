# DigiiQ Backend

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file in the backend directory with your configuration:

```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=digiiq
```

## Database Management

The application uses PostgreSQL with Sequelize ORM. Database operations are separated into two commands:

### Sync Database (for schema changes)

To sync database schema (create/alter tables):

```bash
node scripts/syncDb.js
```

Note: Use this command when:

- Setting up the project for the first time
- Making changes to database models
- Deploying new schema changes

### Start Server

To start the application server (without database sync):

```bash
npm run start
```

## Project Structure

```
backend/
├── config/         # Configuration files
├── controllers/    # Business logic
├── models/        # Database models
├── routes/        # API routes
├── scripts/       # Utility scripts
└── uploads/       # File upload directory
```
