# Airbnb Backend Project — Version 4 (Mongoose + Cookies & Sessions)

The fourth version of my Airbnb-style backend project, built while learning Node.js, Express.js, MongoDB, and backend development.

Version 4 builds on Version 3 by replacing direct MongoDB driver operations with **Mongoose schemas and models** and introducing **cookies and session management**. The application keeps the same core Airbnb-style UI and listing functionality while exploring a different database abstraction and session-based state management.

## 🚀 Live Demo

**[View the live application](https://airbnb-backend-v4.onrender.com)**

Deployed on Render and connected to MongoDB Atlas.

## 🛠️ Tech Stack

- Node.js
- Express.js
- EJS
- JavaScript
- Tailwind CSS
- MongoDB
- MongoDB Atlas
- Mongoose
- Express Session
- connect-mongodb-session
- dotenv

## 📚 Concepts Covered

- Node.js and Express.js
- Express routing and dynamic routes
- HTTP GET and POST requests
- EJS templates and dynamic UI rendering
- MVC architecture with controllers and models
- CRUD operations
- Mongoose schemas and models
- Schema validation and data types
- MongoDB Atlas integration
- Cookies and session management
- MongoDB-backed session storage
- Session regeneration during the demo login flow
- Session destruction and cookie clearing on logout
- Protecting host routes using session state
- Environment variables and secret management
- HTTP-only cookies, `SameSite`, and production `Secure` cookie configuration
- ObjectId validation and database error handling
- Centralized 404 and 500 error handling
- Tailwind CSS build and minification
- Graceful server and database shutdown

## ✨ Features

### User Side

- View Airbnb-style house listings
- View house details
- Add houses to favourites
- Remove houses from favourites
- View favourite houses
- View reservation preview
- View bookings page
- Demo login and logout flow to practise session handling

### Host Side

- Add a new house
- View host house list
- Edit house details
- Delete a house
- Validate listing data before saving
- Restrict host routes based on the session login flag

## 🗄️ Database and Sessions

This version uses **MongoDB with Mongoose** for application data and MongoDB-backed storage for Express sessions.

- **Database connection:** Configured using `MONGO_URL`
- **Application data:** Stored in MongoDB collections managed through Mongoose models
- **Session collection:** `sessions` (created/used by `connect-mongodb-session`)
- **Session secret:** Configured using `SESSION_SECRET`; used to sign the session ID cookie

The login flow currently demonstrates session creation and protected-route behaviour only. It does **not** verify a real user account or password. Favourites and host listing operations are not yet tied to individual authenticated user accounts.

## ⚙️ Setup & Installation

### 1. Prerequisites

- Node.js LTS
- A MongoDB Atlas account or a local MongoDB instance

### 2. Clone the Repository and Install Dependencies

From the root of the project repository:

```bash
git clone https://github.com/Sangeet-30/airbnb-Backend-Project.git
cd airbnb-Backend-Project/Version-4_Mongoose_Cookies_Sessions
npm install
```

If your local folder has a different name, adjust the `cd` path accordingly.

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure the values in `.env`:

```env
MONGO_URL=mongodb+srv://<username>:<password>@<cluster-host>/<database-name>
SESSION_SECRET=<long-random-secret>
NODE_ENV=development
PORT=3000
```

- `MONGO_URL` — MongoDB connection string
- `SESSION_SECRET` — Long, unpredictable secret used to sign session cookies
- `NODE_ENV` — Use `development` locally and `production` when deployed
- `PORT` — Local server port; hosting providers may set this automatically

Generate a random session secret with Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> **Important:** Never commit `.env` or expose database credentials or the session secret. Keep `.env` in `.gitignore` and configure production secrets through the hosting provider's environment settings.

### 4. Build Tailwind CSS

```bash
npm run build
```

For development with automatic CSS rebuilding:

```bash
npm run tailwind
```

### 5. Start the Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Open `http://localhost:3000` unless you configured a different port.

## 📁 Project Structure

```text
Version-4_Mongoose_Cookies_Sessions/
├── controllers/
│   ├── authController.js
│   ├── errors.js
│   ├── hostController.js
│   └── storeController.js
├── models/
│   ├── favourites.js
│   └── house.js
├── public/
│   ├── home.css
│   └── output.css
├── routes/
│   ├── authRouter.js
│   ├── hostRouter.js
│   └── storeRouter.js
├── utils/
│   └── pathUtil.js
├── views/
│   ├── auth/
│   ├── host/
│   ├── partials/
│   ├── store/
│   └── input.css
├── .env.example
├── .gitignore
├── app.js
├── nodemon.json
├── package.json
└── README.md
```

## 🔐 Security Notes

- Use a dedicated MongoDB database user with only the permissions required by the application.
- Keep `MONGO_URL` and `SESSION_SECRET` in environment variables; never commit `.env`.
- The session cookie is configured with `httpOnly`, `sameSite`, and `secure` in production.
- The login route currently sets a session login flag without checking real credentials. This is a learning demonstration, not production authentication.
- Before production use, implement real user accounts, password hashing and verification, CSRF protection, and user-specific authorization for listings and favourites.
- Use HTTPS in production and review session expiration and store configuration before deployment.

## 🔄 Project Versions

- **Version 1:** JSON file storage
- **Version 2:** MySQL with Aiven
- **Version 3:** MongoDB with the native MongoDB Node.js driver
- **Version 4:** MongoDB with Mongoose, plus cookies and sessions

---

This project is part of my backend learning journey. Version 4 builds on the previous database implementations and introduces Mongoose and session-based state management.
