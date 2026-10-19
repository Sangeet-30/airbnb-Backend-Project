# Airbnb Backend Project — Version 5 (Authentication & Authorization)

The fifth version of my Airbnb-style backend project, built while learning Node.js, Express.js, MongoDB, and backend development.

This version builds on Version 4 by introducing **user authentication, role-based authorization, Cloudinary image uploads, and PDF downloads**. It focuses on understanding authentication, session management, access control, and cloud-based file storage in an Express.js application.

## 🚀 Live Demo

**[View the Live Application](https://airbnb-backend-v5.onrender.com)**

The application is deployed on Render. The first request after inactivity may take some time to respond.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, JavaScript, Tailwind CSS
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** Express Session, connect-mongodb-session, bcryptjs
- **Validation:** Express Validator
- **Image Uploads:** Multer, Cloudinary, multer-storage-cloudinary
- **File Downloads:** PDF downloads
- **Configuration:** dotenv
- **Deployment:** Render

## ✨ Features

### User Features

- Browse Airbnb-style property listings
- View individual property details
- Add properties to favourites
- Remove properties from favourites
- View the favourites page
- Sign up, log in, and log out
- Download house rules as a PDF

### Host Features

- Access protected host routes
- View only the host's own property listings
- Add new property listings
- Edit property details
- Upload and replace property images using Cloudinary
- Delete property listings
- Restrict property management to the owning host

### Additional Features

- Session-based authentication
- Guest and host roles
- Role-based authorization and protected routes
- Host ownership verification
- Cloudinary image storage and delivery
- Cloudinary image cleanup when photos are replaced or listings are deleted
- Form validation and error handling
- Custom 404 page
- Booking page retained as a **UI preview only**

> **Note:** Actual booking creation and booking database functionality are not implemented in Version 5.

## 📚 Concepts Covered

- Node.js and Express.js fundamentals
- Express routing and dynamic routes
- HTTP GET and POST requests
- EJS templates and dynamic rendering
- MVC architecture
- Controllers and models
- CRUD operations using Mongoose
- MongoDB Atlas integration
- User signup and login
- Password hashing with bcrypt
- Session-based authentication
- MongoDB-backed session storage
- Guest and host roles
- Role-based authorization
- Protected routes and host ownership checks
- Image uploads using Multer and Cloudinary
- Cloud storage and image URLs
- PDF downloads
- Form validation and error handling
- Environment variables and secret management
- Tailwind CSS compilation
- Deployment with Render

## 🗄️ Database

This version uses MongoDB with Mongoose for application data and MongoDB-backed storage for Express sessions.

**Collections:**

- `users` — registered users, roles, and favourites.
- `houses` — property details, Cloudinary image URLs, image public IDs, and host references.
- `sessions` — session data.

A bookings collection is not required because booking functionality is only a UI preview.

### Image Storage

Property images are stored in **Cloudinary**, while MongoDB stores the image URL and Cloudinary public ID.

- `photo` — Cloudinary HTTPS image URL.
- `photoPublicId` — Cloudinary public ID used to manage the image.

The application no longer relies on a local `uploads/` directory for property images. This allows uploaded images to persist independently of Render's local filesystem.

## ⚙️ Setup & Installation

### 1. Prerequisites

- Node.js (LTS version recommended)
- MongoDB Atlas account or a local MongoDB instance
- Cloudinary account
- Git

### 2. Clone the Repository

```bash
git clone https://github.com/Sangeet-30/airbnb-Backend-Project.git
cd airbnb-Backend-Project
```

Navigate to Version 5:

```bash
cd Version-5_Auth-Upload-Download
```

Install dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the Version 5 project root using the following template:

```env
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_long_random_secret
NODE_ENV=development
PORT=3000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

| Variable | Purpose |
|---|---|
| `MONGO_URL` | MongoDB connection string |
| `SESSION_SECRET` | Secret used for session management |
| `NODE_ENV` | Application environment |
| `PORT` | Local server port |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

Use your actual credentials in `.env`. The `.env.example` file should contain placeholders only.

> **Security:** Never commit `.env` or expose database credentials, session secrets, or Cloudinary API secrets.

### 4. Build Tailwind CSS

Build the CSS:

```bash
npm run build
```

For development with automatic CSS rebuilding:

```bash
npm run tailwind
```

Use the scripts defined in `package.json` if they differ from these commands.

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
├── utils/
│   ├── cloudinary.js
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

## 🔐 Security & Configuration

- Passwords are hashed using bcrypt.
- Authentication state is maintained through Express sessions.
- Session data is stored in MongoDB.
- Host routes use role checks and property ownership verification.
- Database credentials, session secrets, and Cloudinary credentials are managed through environment variables.
- `.env` is excluded from Git.
- `.env.example` provides a template without real credentials.
- Property images are uploaded directly to Cloudinary rather than stored on the application's local filesystem.

## 🌐 Deployment

The application is deployed on Render.

To deploy your own instance:

1. Push the project to GitHub.
2. Create a Web Service on Render.
3. Select the repository and configure the Version 5 directory as the root directory.
4. Configure the build command to install dependencies and build Tailwind CSS as required by the project.
5. Set the start command to `npm start`.
6. Add `MONGO_URL`, `SESSION_SECRET`, `NODE_ENV`, and the three Cloudinary environment variables in Render.
7. Configure MongoDB Atlas network access for the deployed application.
8. Deploy and verify authentication, authorization, property management, image uploads, image replacement, and PDF downloads.

Cloudinary keeps property images available independently of Render's local filesystem and redeployments.

## 🔄 Project Versions

This project has evolved through multiple versions as I learn backend development.

- **Version 1:** Node.js, Express.js, and JSON file storage.
- **Version 2:** MySQL database integration with Aiven.
- **Version 3:** MongoDB integration using the native MongoDB Node.js driver.
- **Version 4:** Mongoose, cookies, and sessions.
- **Version 5:** Authentication, authorization, Cloudinary image uploads, and PDF downloads.

Each version builds on the previous one and introduces additional backend development concepts.

## 📌 Learning Journey

Version 5 helped me practise authentication, password hashing, session management, role-based authorization, protected routes, cloud-based image uploads, and PDF downloads while continuing to develop the Airbnb-style application.

This project strengthened my understanding of how backend features work together in a practical application and prepared me to build more advanced backend and full-stack projects.
