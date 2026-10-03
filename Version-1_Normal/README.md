# Airbnb Backend Project — Version 1

The first version of my Airbnb-style backend project, built while learning
Node.js and Express.js.

This version uses **JSON files for data storage** instead of a database.
It helped me understand the basic structure and flow of a backend
application before moving to MySQL and MongoDB.

## 🚀 Live Demo

[Live Demo](https://airbnb-backend-v1-rsow.onrender.com)

> The live demo is deployed on Render's free plan, so the first request
> after inactivity may take some time to respond.

## 🛠️ Tech Stack

- Node.js
- Express.js
- EJS
- JavaScript
- Tailwind CSS
- JSON File Storage

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
- File System (`fs`) for data storage
- Request Body Handling
- Static Files
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

## 💾 Data Storage

This version uses JSON files for data storage:

```text
data/
├── houses.json
└── favourite.json