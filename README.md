# Airbnb Backend Project

A backend development project inspired by Airbnb, built while learning Node.js, Express.js, databases, authentication, and backend development concepts.

The project is developed through five versions, with each version exploring different database technologies and backend concepts.

## 🚀 Live Demos

### Version 1 — Normal

[**Airbnb Backend V1**](https://airbnb-backend-v1-rsow.onrender.com)

A Node.js and Express.js application using JSON file-based storage.

> Deployed on Render's free plan. The first request after inactivity may take some time to respond.

### Version 2 — MySQL

[**Airbnb Backend V2**](https://airbnb-backend-v2.onrender.com)

Uses MySQL for relational database operations, with the database hosted on Aiven.

### Version 3 — MongoDB

[**Airbnb Backend V3 — MongoDB**](https://airbnb-backend-v3.onrender.com)

Uses MongoDB Atlas and the native MongoDB Node.js driver for NoSQL database operations.

### Version 4 — Mongoose, Cookies & Sessions

[**Airbnb Backend V4 — Mongoose + Cookies & Sessions**](https://airbnb-backend-v4.onrender.com)

Uses Mongoose for schema-based MongoDB operations and MongoDB-backed session storage for Express sessions.

### Version 5 — Authentication, Authorization, Upload & Download

[**Airbnb Backend V5**](https://airbnb-backend-v5.onrender.com)

Introduces user authentication, role-based authorization, Cloudinary image uploads, and house-rules PDF downloads.

> The applications are deployed on Render. Services on the free plan may take some time to respond after inactivity.

## 📂 Project Versions

### Version 1 — Normal

Node.js and Express.js backend with file-based JSON storage.

**Concepts covered:**

- Node.js and Express.js
- EJS templates and dynamic rendering
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

The project was rebuilt using MySQL to practise relational database operations and replace JSON file-based storage.

**Concepts covered:**

- MySQL database integration
- SQL queries and connection pooling
- CRUD operations with MySQL
- Relational data and foreign keys
- Favourites stored in MySQL
- SQL JOIN operations
- Parameterized queries
- Environment variables for database credentials
- Async/await database handling
- Tailwind CSS
- Cloud MySQL deployment with Aiven
- Deployment with Render

### Version 3 — MongoDB

The project was rebuilt using MongoDB and the native MongoDB Node.js driver to practise NoSQL database operations.

**Concepts covered:**

- MongoDB NoSQL database integration
- Native MongoDB Node.js driver (`mongodb`)
- Collections and BSON document storage
- CRUD operations with MongoDB
- Direct database `$in` querying for favourites
- Unique index constraints
- BSON `ObjectId` validation and error handling
- Cascade-style cleanup for deleted listings in favourites
- Server-side form validation and input retention
- Async/await error handling
- Custom 404 and 500 views
- Environment variables and application configuration
- Graceful database connection shutdown
- Tailwind CSS build and minification
- MongoDB Atlas
- Deployment with Render

### Version 4 — Mongoose + Cookies & Sessions

This version introduces Mongoose for schema-based MongoDB interactions and cookies and sessions for maintaining state across HTTP requests.

**Concepts covered:**

- Mongoose schemas and models
- Schema validation and model-based database operations
- MongoDB integration through Mongoose
- Express Session and session management
- MongoDB-backed session storage
- Demo login and logout flow
- Session-based access checks for host routes
- Environment variables for database credentials and session secrets
- HTTP-only and production secure cookie configuration
- Tailwind CSS
- Deployment with Render

> **Security note:** Version 4 uses a demonstration login flow and does not verify real user credentials. Host route checks rely on session state, and listings and favourites are not associated with individual authenticated users. Do not treat this version as production authentication.

### Version 5 — Authentication, Authorization, Upload & Download

This version builds on Version 4 by introducing real user authentication, role-based authorization, Cloudinary image storage, and PDF downloads.

**Concepts covered:**

- User signup and login
- Password hashing using bcrypt
- Session-based authentication
- MongoDB-backed session storage
- Guest and host roles
- Role-based authorization and protected routes
- Host ownership checks for property management
- Mongoose schemas, models, and CRUD operations
- Image uploads using Multer and Cloudinary
- Cloudinary image URLs and public IDs
- Cloud-based image replacement and deletion
- PDF downloads for house rules
- Form validation and error handling
- Environment variables and secret management
- Tailwind CSS build and minification
- Deployment with Render

**Key features:**

- Browse property listings and view house details
- Add and remove favourite houses
- Register, log in, and log out
- Restrict guest and host access according to their roles
- Add, edit, and delete host-owned property listings
- Upload and replace property images using Cloudinary
- Download house rules as a PDF

> **Note:** The bookings page is retained as a UI preview only. Actual booking creation and booking database functionality are not implemented in Version 5.

**Image storage:** Property images are stored in Cloudinary, while MongoDB stores their HTTPS URLs and public IDs. The application no longer depends on a local `uploads/` directory, so images persist independently of Render's local filesystem and redeployments.

## 🛠️ Tech Stack

Technologies vary by version.

- Node.js
- Express.js
- EJS
- JavaScript
- Tailwind CSS
- JSON file storage — Version 1
- MySQL and MySQL2 — Version 2
- Aiven — Version 2
- MongoDB and the native MongoDB Node.js driver — Version 3
- MongoDB Atlas — Versions 3, 4, and 5
- Mongoose — Versions 4 and 5
- Express Session and MongoDB-backed session storage — Versions 4 and 5
- bcryptjs — Version 5
- Express Validator — Version 5
- Multer — Version 5
- Cloudinary and `multer-storage-cloudinary` — Version 5
- dotenv

## ✨ Project Features

Features vary by version as the project evolves.

- Browse property listings
- View property details
- Add, edit, and delete property listings
- Add and remove favourite properties
- View favourite properties
- Dynamic routes and CRUD operations
- MVC architecture
- JSON, MySQL, and MongoDB data storage across versions
- Session-based state management
- User authentication and password hashing
- Guest and host role-based authorization
- Host-owned property management
- Cloudinary image uploads, replacement, and deletion
- PDF downloads

## 🔐 Configuration and Security

- Configure database connections through environment variables.
- Keep `.env` out of Git and commit `.env.example` with placeholder values.
- Keep `SESSION_SECRET` strong and private.
- Use database credentials with appropriate permissions.
- Never publish database passwords, session secrets, API secrets, or connection strings.
- Use appropriate secure cookie settings in production and deploy behind HTTPS.
- Version 4 uses a demo login flow and is not production-ready authentication.
- Version 5 introduces password hashing and role-based access checks but remains a learning project rather than a fully hardened production booking platform.
- Version 5 stores uploaded property images in Cloudinary rather than on the application's local filesystem.

## 📁 Project Structure

```text
airbnb-Backend-Project/
├── Version-1-Normal/
├── Version-2_MySQL/
├── Version-3_MongoDB/
├── Version-4_Mongoose_Cookies_Sessions/
├── Version-5_Auth-Upload-Download/
├── README.md
└── .gitignore
```

Each version has its own implementation and configuration. Refer to the individual version's README for setup instructions and version-specific details.

## 📌 Learning Journey

- **Version 1:** JSON file-based storage
- **Version 2:** MySQL with Aiven
- **Version 3:** MongoDB with the native MongoDB Node.js driver
- **Version 4:** Mongoose, cookies, and sessions
- **Version 5:** Authentication, authorization, Cloudinary image uploads, and PDF downloads

Each version builds on the previous one and explores different approaches to backend data storage, database integration, authentication, authorization, and file handling.

## 👨‍💻 Author

**Sangeet**

GitHub: [Sangeet-30](https://github.com/Sangeet-30)
