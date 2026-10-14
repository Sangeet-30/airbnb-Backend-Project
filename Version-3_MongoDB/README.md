# Airbnb Backend Project — Version 3 (MongoDB)

The third version of my Airbnb-style backend project, built while learning
Node.js, Express.js, and MongoDB.

This version replaces the MySQL database used in Version 2 with **MongoDB** and
uses the **native MongoDB Node.js driver** directly, without Mongoose. It helped
me practise working with NoSQL documents, collections, queries, and database
operations before moving to Mongoose in Version 4.

## 🚀 Live Demo

Live Demo Coming soon...


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

## 📚 Concepts Covered

- Node.js & Express.js
- Express Routing
- Dynamic Routes
- HTTP GET & POST Requests
- EJS Templates
- Dynamic UI Rendering
- MVC Architecture
- Controllers & Models
- CRUD Operations
- MongoDB Database Integration
- Collections and Documents
- MongoDB Queries and Updates
- BSON `ObjectId` handling and validation
- Upsert operations
- Unique indexes
- Server-side form validation
- Environment Variables
- Error / 404 Handling
- Tailwind CSS
- Database connection management
- Deployment preparation for Render

## ✨ Features

### User Side

- View Airbnb-style house listings
- View house details
- Add houses to favourites
- Remove houses from favourites
- View favourite houses
- View reservation preview
- View bookings page

### Host Side

- Add a new house
- View host house list
- Edit house details
- Delete a house
- Validate listing data before saving

## 🗄️ Database

This version uses **MongoDB** instead of MySQL.

- **Local Development / Cloud Database:** MongoDB or MongoDB Atlas
- **Database name:** Configured through the `MONGO_DB_NAME` environment variable
- **Collections:**
  - `houses` — stores house listings
  - `favourite` — stores favourite house IDs

Favourites are currently shared across visitors because the project does not yet include user authentication or per-user favourites.

## ⚙️ Setup & Installation

### 1. Prerequisites

- Node.js (v18 or higher recommended)
- A MongoDB Atlas account or a local MongoDB instance

### 2. Clone the Repository and Install Dependencies

```bash
git clone <your-repository-url>
cd <project-folder>
npm install
```

Replace the placeholders with your repository URL and project folder.

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
- `PORT` — local server port

> **Important:** Never commit `.env` or expose your database credentials. Keep `.env` in `.gitignore` and configure production secrets through your hosting provider's environment settings.

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

The application uses the configured `PORT`, or `3000` if no port is provided.

## 📁 Project Structure

```text
airbnb-backend-mongodb/
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

## 🔐 Security Notes

- Use a dedicated MongoDB database user for this application.
- Grant the application user access only to the database it needs.
- Keep real credentials in `.env` locally and in the hosting provider's environment variables for deployment.
- Do not commit `.env` or paste connection strings into public repositories.
- Host management routes are not protected by authentication in this learning version; do not treat the project as a production-ready booking platform.

## 🔄 Project Versions

- **Version 1:** JSON file storage
- **Version 2:** MySQL with Aiven
- **Version 3:** MongoDB with the native MongoDB driver

---

This project is part of my backend learning journey, building on the concepts from
the previous version and preparing for the next step with Mongoose.
