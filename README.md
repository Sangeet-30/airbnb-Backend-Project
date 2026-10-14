# Airbnb Backend Project

A backend development project inspired by Airbnb, built while learning Node.js, Express.js, databases, and backend development concepts.

The same project is developed through multiple versions as new technologies and concepts are learned and implemented.

## 🚀 Live Demos

### Version 1 — Normal

[Airbnb Backend V1](https://airbnb-backend-v1-rsow.onrender.com)

> The live demo is deployed on Render's free plan, so the first request after inactivity may take some time to respond.

### Version 2 — MySQL

[Airbnb Backend V2](https://airbnb-backend-v2.onrender.com)

> The live demo uses a MySQL database hosted on Aiven.

### Version 3 — MongoDB

The MongoDB version uses MongoDB Atlas and the native MongoDB Node.js driver. Add the live demo link here when this version is deployed.


## 📂 Project Versions

### Version 1 — Normal

Node.js + Express.js backend with file-based JSON storage.

**Concepts covered:**

- Node.js
- Express.js
- EJS
- Routing
- Dynamic Paths
- MVC Architecture
- Controllers & Models
- CRUD Operations
- Favourites
- Edit & Delete functionality
- JSON file-based data storage
- Tailwind CSS
- Deployment with Render

### Version 2 — MySQL

The Airbnb project is rebuilt using **MySQL** to replace JSON file-based storage and practise relational database operations.

**Concepts covered:**

- MySQL database integration
- SQL queries
- Database connection and connection pooling
- CRUD operations with MySQL
- Relational data
- Foreign keys
- Favourites stored in MySQL
- SQL JOIN operations
- Parameterized queries
- Environment variables for database credentials
- Async/Await database handling
- Tailwind CSS
- Deployment with Render
- Cloud MySQL deployment with Aiven

### Version 3 — MongoDB

The project is rebuilt using **MongoDB** and the native MongoDB Node.js driver to practise NoSQL database operations.

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
- Deployment with Render (add the live URL when available)

### Version 4 — Mongoose

The project is further developed using **Mongoose** for schemas, models, validation, and MongoDB integration.


## 🛠️ Tech Stack

- Node.js
- Express.js
- EJS
- JavaScript
- Tailwind CSS
- JSON file storage (Version 1)
- MySQL
- MySQL2
- Aiven
- MongoDB
- MongoDB Node.js Driver
- MongoDB Atlas
- Mongoose
- dotenv

## ✨ Project Features

Features vary slightly by version as the project evolves.

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

## 🔐 Configuration and Security

- Configure database connection details through environment variables.
- Keep `.env` out of Git; commit `.env.example` with placeholder values instead.
- Use separate database credentials with only the permissions each deployed version needs.
- Never publish database passwords or connection strings in the repository.

## 📁 Project Structure

```text
airbnb-Backend-Project/
├── Version-1-Normal/
├── Version-2_MySQL/
├── Version-3-MongoDB/
├── Version-4-Mongoose/
├── README.md
└── .gitignore
```

## 📌 Learning Journey

- **Version 1:** JSON file-based storage
- **Version 2:** MySQL with Aiven
- **Version 3:** MongoDB with the native MongoDB Node.js driver

Each version builds on the previous one and explores a different approach to backend data storage and database integration.
