# Airbnb Backend Project — Version 3 (MongoDB)

The third version of my Airbnb-style backend project, built while learning **Node.js, Express.js, and MongoDB**.

This version replaces the MySQL database used in Version 2 with **MongoDB** and uses the **native MongoDB Node.js driver** directly, without Mongoose. It helped me practise working with NoSQL documents, collections, queries, and database operations before moving to Mongoose in Version 4.

## 🚀 Live Demo

**[View the live application](https://airbnb-backend-v3.onrender.com)**

Deployed on Render and connected to MongoDB Atlas.

## 🛠️ Tech Stack

- Node.js
- Express.js
- EJS
- JavaScript
- Tailwind CSS
- MongoDB
- MongoDB Atlas
- MongoDB Native Node.js Driver
- dotenv
- Render (deployment)

## 📚 Concepts Covered

- Node.js and Express.js
- Express routing and dynamic routes
- HTTP GET and POST requests
- EJS templates and dynamic UI rendering
- MVC architecture
- Controllers and models
- CRUD operations
- MongoDB database integration
- Collections and documents
- MongoDB queries and updates
- BSON `ObjectId` handling and validation
- Upsert operations
- Unique indexes
- Server-side form validation
- Environment variables
- Error and 404 handling
- Tailwind CSS build process
- Database connection management
- Deployment with Render and MongoDB Atlas

## ✨ Features

### User Side

- View Airbnb-style house listings
- View house details
- Add houses to favourites
- Remove houses from favourites
- View favourite houses
- View reservation preview
- View the bookings page

### Host Side

- Add a new house listing
- View the host house list
- Edit house details
- Delete a house listing
- Validate listing data before saving

## 🗄️ Database

This version uses **MongoDB** instead of MySQL.

- **Database provider:** MongoDB Atlas (production); local MongoDB can be used for development
- **Database name:** `airbnb` in the current deployment; configurable through `MONGO_DB_NAME`
- **Collections:**
  - `houses` — stores house listings
  - `favourite` — stores favourite house IDs

> **Note:** Favourites are shared across visitors because this learning project does not yet include user authentication or per-user favourites.

## ⚙️ Setup and Installation

### 1. Prerequisites

- Node.js (v18 or higher recommended)
- npm
- A MongoDB Atlas account or a local MongoDB instance

### 2. Clone the Repository

```bash
git clone https://github.com/Sangeet-30/airbnb-Backend-Project.git
cd airbnb-Backend-Project/Version-3_MongoDB
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and add your own MongoDB connection details.

```bash
cp .env.example .env
```

Example `.env` values:

```env
MONGO_URL=mongodb+srv://<username>:<password>@<cluster-host>/
MONGO_DB_NAME=airbnb
PORT=3000
```

- `MONGO_URL` — MongoDB connection string
- `MONGO_DB_NAME` — database used by this version
- `PORT` — local server port; Render supplies its own port in production

> **Security:** Never commit `.env` or expose database credentials. Keep `.env` in `.gitignore`. Configure production secrets through Render's environment settings and use a dedicated MongoDB database user with access limited to the required database.

### 4. Build Tailwind CSS

```bash
npm run build
```

For development with automatic CSS rebuilding:

```bash
npm run tailwind
```

### 5. Start the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The application uses the configured `PORT`, or `3000` if no port is provided.

## ☁️ Deployment

- **Application hosting:** Render
- **Database hosting:** MongoDB Atlas
- **Status:** Deployment completed and database connection verified

The Render service uses environment variables for its MongoDB connection. Atlas Network Access is configured with the outbound IP ranges shown by the Render service instead of a temporary `0.0.0.0/0` rule.

## 📁 Project Structure

```text
airbnb-Backend-Project/
└── Version-3_MongoDB/
    ├── controllers/
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
    │   ├── hostRouter.js
    │   └── storeRouter.js
    ├── utils/
    │   ├── databaseUtil.js
    │   └── pathUtil.js
    ├── views/
    │   ├── host/
    │   ├── partials/
    │   ├── store/
    │   └── input.css
    ├── .env.example
    ├── .gitignore
    ├── app.js
    ├── nodemon.json
    └── package.json
```

## 🔐 Security Notes and Limitations

- Use a dedicated MongoDB database user for this application.
- Grant the application user access only to the database it needs.
- Keep credentials in `.env` locally and in Render environment variables for deployment.
- Do not commit `.env` or publish connection strings.
- Host management routes are not protected by authentication in this learning version; this project is not a production-ready booking platform.

## 🔄 Project Versions

- **Version 1:** JSON file storage
- **Version 2:** MySQL with Aiven
- **Version 3:** MongoDB with the native MongoDB Node.js driver

---

This project is part of my backend learning journey, building on the previous versions and preparing for the next step with Mongoose.
