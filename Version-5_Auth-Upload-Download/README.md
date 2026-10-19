# Airbnb Backend Project — Version 5 (Authentication & Authorization)

The fifth version of my Airbnb-style backend project, built while learning Node.js, Express.js, MongoDB, and backend development.

This version builds on Version 4 by introducing **user authentication, role-based authorization, image uploads, and PDF downloads**. It focuses on understanding how authentication and file handling work in an Express.js application.

## 🚀 Live Demo

Coming soon....

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
- bcryptjs
- Express Validator
- Multer
- dotenv

## 📚 Concepts Covered

- Node.js and Express.js
- Express routing and dynamic routes
- HTTP GET and POST requests
- EJS templates and dynamic UI rendering
- MVC architecture
- Controllers and models
- CRUD operations using Mongoose
- MongoDB Atlas integration
- User signup and login
- Password hashing with bcrypt
- Session-based authentication
- MongoDB-backed session storage
- Guest and host roles
- Role-based authorization and protected routes
- Host ownership checks for property management
- Image uploads using Multer
- PDF file downloads
- Form validation and error handling
- Environment variables and secret management
- Tailwind CSS build and minification
- Deployment with Render

## ✨ Features

### User Side

- Browse Airbnb-style house listings
- View individual house details
- Add houses to favourites
- Remove houses from favourites
- View the favourites page
- Sign up, log in, and log out
- Download house rules as a PDF

### Host Side

- Access protected host routes
- View only the host's own house listings
- Add new house listings
- Edit house details
- Upload house images
- Delete house listings
- Restrict property management to the owning host

### Additional Features

- Session-based authentication
- Role-based access restrictions
- Dynamic host attribution on property cards
- Form validation and error handling
- Custom 404 page
- Booking page retained as a **UI preview only**

> **Note:** Actual booking creation and booking database functionality are not implemented in Version 5.

## 🗄️ Database

This version uses **MongoDB with Mongoose** for application data and MongoDB-backed storage for Express sessions.

**Collections:**

- `users` — stores registered user information.
- `houses` — stores property listing information.
- `sessions` — stores session data.

The bookings collection is not required for this version.

## ⚙️ Setup & Installation

### 1. Prerequisites

- Node.js (LTS version recommended)
- MongoDB Atlas account or a local MongoDB instance
- Git

### 2. Clone the Repository and Install Dependencies

```bash
git clone https://github.com/Sangeet-30/airbnb-Backend-Project.git
cd airbnb-Backend-Project
```

Navigate to the Version 5 directory:

```bash
cd "Version-5_Authentication-&-Autherization--Upload-&-Download-files"
```

If the folder name changes in the repository, use the actual directory name.

Install dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the Version 5 project root and configure the variables used by the application.

```env
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_long_random_secret
NODE_ENV=development
PORT=3000
```

- `MONGO_URL` — MongoDB connection string.
- `SESSION_SECRET` — secret used for session management.
- `NODE_ENV` — application environment.
- `PORT` — local server port.

> **Important:** Never commit `.env` or expose database credentials. Keep real secrets in environment variables and use `.env.example` with placeholder values for the repository.

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

Open the application at:

```text
http://localhost:3000
```

Use the scripts defined in `package.json` if they differ from these commands.

## 📁 Project Structure

```text
Version-5_Auth-Upload-Download/
├── controllers/
│   ├── authController.js
│   ├── errors.js
│   ├── hostController.js
│   └── storeController.js
├── models/
│   ├── house.js
│   └── user.js
├── public/
│   ├── home.css
│   └── output.css
├── routes/
│   ├── authRouter.js
│   ├── hostRouter.js
│   └── storeRouter.js
├── rules/
│   └── House Rules.pdf
├── uploads/
├── utils/
│   └── pathUtil.js
├── views/
│   ├── auth/
│   ├── host/
│   ├── partials/
│   ├── store/
│   ├── 404.ejs
│   └── input.css
├── .env.example
├── .gitignore
├── app.js
├── nodemon.json
├── package.json
└── README.md
```

## 🔐 Configuration and Security

- Passwords are hashed using bcrypt.
- Authentication state is maintained through Express sessions.
- Host routes use role checks and property ownership verification.
- Database connection details and session secrets are configured through environment variables.
- `.env` is excluded from Git, while `.env.example` provides a template.

**Deployment note:** Property images are stored on the local filesystem. On hosting platforms with ephemeral storage, uploaded images may not survive redeployments or instance replacement unless persistent storage is configured.

## 🌐 Deployment

This application can be deployed to Render.

1. Push the project to GitHub.
2. Create a Web Service in Render.
3. Select the repository and set the root directory to the Version 5 project folder.
4. Configure the build command, including the Tailwind build if required.
5. Set the start command to `npm start`.
6. Add `MONGO_URL`, `SESSION_SECRET`, and `NODE_ENV=production` to the environment variables.
7. Configure MongoDB Atlas network access for the deployed application.
8. Test authentication, authorization, property management, image uploads, and PDF downloads after deployment.

## 🔄 Project Versions

This project has evolved through multiple versions as I learn backend development.

- **Version 1:** Node.js, Express.js, and JSON file storage
- **Version 2:** MySQL database integration with Aiven
- **Version 3:** MongoDB using the native MongoDB Node.js driver
- **Version 4:** Mongoose, cookies, and sessions
- **Version 5:** Authentication, authorization, image uploads, and PDF downloads

Each version builds on the previous one and introduces new backend concepts.

## 📌 Learning Journey

Version 5 helped me practise authentication, password hashing, session management, role-based authorization, file uploads, and PDF downloads while continuing to develop the Airbnb-style application.

The next step is to apply these concepts in more advanced backend and full-stack projects.
