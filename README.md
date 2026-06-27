# Shiori Notes — Backend

A RESTful API backend for the Shiori AI Notes app, built with **Node.js**, **Express.js**, **MySQL**, and **Google Gemini AI**. Handles user authentication, note management, OTP-based password recovery, and AI-powered note summarization.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MySQL (via `mysql2`) |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Email | Nodemailer (Gmail SMTP) |
| AI | Google Gemini 2.5 Flash (`@google/genai`) |
| OTP | otp-generator |
| Config | dotenv |

---

## Project Structure

```
NotesAppBackend/
├── server.js                        # Entry point — starts server on port 3000
├── .env                             # Environment variables (not committed)
├── package.json
└── src/
    ├── app.js                       # Express app setup — middleware + all routes
    ├── db/
    │   └── db.js                    # MySQL connection pool (mysql2)
    ├── controllers/                 # Business logic for each endpoint
    │   ├── getNotes,controllers.js  # Fetch all notes of logged-in user
    │   ├── getNotesId.controllers.js# Fetch single note by ID
    │   ├── getNotesFilter.controllers.js # Filter notes
    │   ├── sendNotes.controllers.js # Create a new note
    │   ├── editNotes.controllers.js # Update existing note
    │   ├── deleteNotes.controllers.js # Delete a note
    │   ├── summarizeNotes.controllers.js # AI summarize via Gemini
    │   ├── userData.controllers.js  # Register new user
    │   ├── loginUser.controllers.js # Login + issue JWT cookie
    │   ├── forgotPassword.controllers.js # Generate + email OTP
    │   ├── otpVerify.controllers.js # Verify OTP
    │   └── resetPassword.controllers.js  # Reset password after OTP
    ├── routes/                      # Express routers (maps URL → controller)
    │   ├── getNotes.routes.js
    │   ├── getNotesID.routes.js
    │   ├── getNotesFilter.routes.js
    │   ├── sendNotes.routes.js
    │   ├── editNotes.routes.js
    │   ├── deleteNotes.routes.js
    │   ├── summarizeNotes.routes.js
    │   ├── userData.routes.js
    │   ├── loginUser.routes.js
    │   ├── forgotPassword.routes.js
    │   ├── otpVerify.routes.js
    │   └── resetPassword.routes.js
    └── services/                    # Reusable utility functions
        ├── decodeToken.js           # JWT middleware — verifies token from cookie
        ├── gemini.js                # Gemini AI wrapper (retry logic included)
        ├── getUserFromDb.js         # Fetches user record by email
        ├── mailTrap.js              # Nodemailer config — sends OTP email
        └── passwordEncryption.js   # bcrypt hash helper
```

---

## Environment Variables

Create a `.env` file in the root of `NotesAppBackend/`:

```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=shiori_notes

TOKEN_SECRET_KEY=your_jwt_secret_key

GEMINI_API_KEY=your_google_gemini_api_key
```

> **Note:** Gmail SMTP credentials are currently hardcoded in `mailTrap.js`. Move them to `.env` for production.

---

## Database Setup (MySQL)

The app uses **MySQL** with a `mysql2` connection pool. You need to create these tables manually:

```sql
-- Users table
CREATE TABLE user_info (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notes table
CREATE TABLE notes_data (
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);

-- OTP table
CREATE TABLE otp_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    otp_number VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Installation & Running

```bash
# Install dependencies
npm install

# Development (with auto-restart via nodemon)
npm run dev

# Production
npm start
```

Server starts at `http://localhost:3000`

---

## API Endpoints

### Auth Routes — `/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login — returns JWT as httpOnly cookie | No |
| POST | `/auth/forgotPassword` | Send OTP to email | No |
| POST | `/auth/verifyOTP` | Verify OTP | No |
| POST | `/auth/resetPassword` | Reset password | No |
| GET | `/auth/userData` | Get logged-in user info | Yes |

### Notes Routes — `/notes`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/notes/getNotes` | Get all notes of logged-in user | Yes |
| GET | `/notes/getNotes/:id` | Get single note by ID | Yes |
| GET | `/notes/getNotesFilter` | Filter/search notes | Yes |
| POST | `/notes/sendNotes` | Create a new note | Yes |
| PUT | `/notes/editNotes` | Edit an existing note | Yes |
| DELETE | `/notes/deleteNotes` | Delete a note | Yes |
| POST | `/notes/summarizeNotes` | Summarize note content using Gemini AI | Yes |

---

## Authentication Flow

1. User logs in via `POST /auth/login`
2. Server verifies password using **bcrypt**, issues a **JWT** stored as an `httpOnly` cookie (expires in 7 days)
3. All protected routes use the `decodeToken` middleware which reads the cookie, verifies the JWT, and attaches `req.user` (contains `user_id` and `email`)

---

## Password Recovery Flow

1. User hits `POST /auth/forgotPassword` with their email
2. Server generates a 6-digit numeric OTP using `otp-generator`, stores it in `otp_table` with a 5-minute expiry, and emails it via **Nodemailer**
3. User submits OTP to `POST /auth/verifyOTP`
4. On success, user can call `POST /auth/resetPassword` with the new password

---

## AI Summarization

The `gemini.js` service wraps Google Gemini 2.5 Flash with a **3-retry mechanism** (3-second delay between retries) to handle transient API failures.

```js
// Usage inside summarizeNotes controller
const summary = await geminiSummarize(noteContent);
```

---

## Key Notes

- CORS is configured to accept requests from **any origin** with credentials (`credentials: true`) — restrict this in production
- Gmail SMTP app password is hardcoded in `mailTrap.js` — move to `.env` before deploying
- No global error handler is currently set up — individual controllers should be wrapped in try/catch for production use
