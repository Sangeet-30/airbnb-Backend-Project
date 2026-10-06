# Airbnb Backend Project — Version 2 (MySQL)

The second version of my Airbnb-style backend project, built while learning
Node.js, Express.js, and SQL database integration.

This version replaces the JSON file-based storage from Version 1 with
**MySQL**, allowing the application to persist house and favourite data
using a relational database.

## 🚀 Live Demo

[Live Demo](https://airbnb-backend-v2.onrender.com)

> The live demo is deployed on Render's free plan, so the first request
> after inactivity may take some time to respond.

## 🛠️ Tech Stack

- Node.js
- Express.js
- EJS
- JavaScript
- Tailwind CSS
- MySQL
- MySQL2
- Aiven
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
- MySQL Database Integration
- SQL Queries
- Parameterized Queries
- Database-driven Data Storage
- Relational Data Handling
- Environment Variables
- Error / 404 Handling
- Tailwind CSS
- Deployment with Render

## ✨ Features

### User Side

- View Airbnb-style house listings
- View house details
- Add houses to favourites
- Remove houses from favourites
- View favourite houses
- View bookings page

### Host Side

- Add a new house
- View host house list
- Edit house details
- Delete a house
- Store house data in MySQL

## 🗄️ Database

This version uses **MySQL** instead of JSON files.

- **Local Development:** MySQL running locally
- **Production Deployment:** MySQL hosted on **Aiven**

### Tables

```text
airbnb/
├── houses
└── favourites