# Airbnb Backend Project

A backend development project inspired by Airbnb, built while learning Node.js, Express.js, databases, and backend development concepts.

The project is developed through multiple versions, with each version exploring a different database technology or backend concept.

## 🚀 Live Demos

### Version 1 — Normal

[Airbnb Backend V1](https://airbnb-backend-v1-rsow.onrender.com)

> Deployed on Render's free plan. The first request after inactivity may take some time to respond.

### Version 2 — MySQL

[Airbnb Backend V2](https://airbnb-backend-v2.onrender.com)

> Uses a MySQL database hosted on Aiven.

### Version 3 — MongoDB

[Airbnb Backend V3 — MongoDB](https://airbnb-backend-v3.onrender.com)

> Deployed on Render and connected to MongoDB Atlas using the native MongoDB Node.js driver. The Render free instance may take some time to respond after inactivity.

### Version 4 — Mongoose + Cookies & Sessions

> Currently tested locally. A live demo will be added after deployment.

## 📂 Project Versions

### Version 1 — Normal

Node.js and Express.js backend with file-based JSON storage.

**Concepts covered:**

- Node.js and Express.js
- EJS
- Routing and dynamic paths
- MVC architecture
- Controllers and models
- CRUD operations
- Favourites
- Edit and delete functionality
- JSON file-based data storage
- Tailwind CSS
- Deployment with Render

### Version 2 — MySQL

The project was rebuilt using **MySQL** to replace JSON file-based storage and practise relational database operations.

**Concepts covered:**

- MySQL database integration
- SQL queries
- Database connection and connection pooling
- CRUD operations with MySQL
- Relational data and foreign keys
- Favourites stored in MySQL
- SQL JOIN operations
- Parameterized queries
- Environment variables for database credentials
- Async/await database handling
- Tailwind CSS
- Deployment with Render
- Cloud MySQL deployment with Aiven

### Version 3 — MongoDB

The project was rebuilt using **MongoDB** and the native MongoDB Node.js driver to practise NoSQL database operations.

**Concepts covered:**

- MongoDB NoSQL database integration
- Native MongoDB Node.js driver (`mongodb`)
- Collections and BSON document storage
- CRUD operations with MongoDB (`insertOne`, `find`, `updateOne`, `deleteOne`)
- Direct database `$in` querying for favourites
- Unique index constraint on the favourites collection
- BSON `ObjectId` validation and error handling
- Cascade-style cleanup for deleted listings in favourites
- Server-side form data validation and input retention
- Async/await error handling with styled 404 and 500 views
- Environment variables for database credentials and ports
- Application lifecycle and graceful connection shutdown
- Tailwind CSS build and minification
- MongoDB Atlas integration
- Deployment with Render

### Version 4 — Mongoose + Cookies & Sessions

This version uses **Mongoose** for schema-based MongoDB interactions and introduces cookie/session concepts for maintaining state across HTTP requests.

**Concepts covered:**

- Mongoose schemas and models
- Schema validation and model-based database operations
- MongoDB integration through Mongoose
- Cookies and session management with Express Session
- MongoDB-backed session storage
- Login and logout flow
- Session-based access checks for host routes
- Environment variables for database credentials and session secrets
- Tailwind CSS
- Local development and testing

> **Note:** This version is currently tested locally. Authentication is a learning implementation; verify that credentials are validated and authorization is enforced before treating it as production-ready or deploying it publicly.

## 🛠️ Tech Stack

- Node.js
- Express.js
- EJS
- JavaScript
- Tailwind CSS
- JSON file storage (Version 1)
- MySQL and MySQL2 (Version 2)
- Aiven (Version 2)
- MongoDB and the native MongoDB Node.js driver (Version 3)
- MongoDB Atlas (Version 3)
- Mongoose (Version 4)
- Express Session and MongoDB-backed session storage (Version 4)
- dotenv

## ✨ Project Features

Features vary by version as the project evolves.

- Browse house listings
- View house details
- Add houses
- Edit house details
- Delete houses
- Add and remove favourite houses
- View favourite houses
- Dynamic routes
- CRUD operations
- Database integration
- MVC architecture
- Session-based state management in Version 4

## 🔐 Configuration and Security

- Configure database connection details through environment variables.
- Keep `.env` out of Git; commit `.env.example` with placeholder values instead.
- Keep `SESSION_SECRET` strong, private, and configured separately for local development and deployment.
- Use separate database credentials with only the permissions each version needs.
- Never publish database passwords, session secrets, or connection strings.
- Use secure cookie settings in production and deploy behind HTTPS.
- Do not treat the Version 4 demo login as production-ready unless credentials are verified and authorization is properly enforced.

## 📁 Project Structure

```text
airbnb-Backend-Project/
├── Version-1-Normal/
├── Version-2_MySQL/
├── Version-3_MongoDB/
├── Version-4_Mongoose_Cookies_Sessions/
├── README.md
└── .gitignore
```

## 📌 Learning Journey

- **Version 1:** JSON file-based storage
- **Version 2:** MySQL with Aiven
- **Version 3:** MongoDB with the native MongoDB Node.js driver
- **Version 4:** Mongoose, cookies, and sessions

Each version builds on the previous one and explores a different approach to backend data storage, database integration, and session management.
