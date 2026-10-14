require("dotenv").config();

// Core Module
const path = require("path");

// External Module
const express = require("express");

// Local Modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const pathDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { mongoConnect, closeDB } = require("./utils/databaseUtil");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(pathDir, "public")));

app.use(storeRouter);
app.use("/host", hostRouter);

app.use(errorsController.get404);
app.use(errorsController.handleError);

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {
    await mongoConnect();
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running at: http://localhost:${PORT}`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        try {
          await closeDB();
        } finally {
          process.exit(0);
        }
      });
    };

    process.once("SIGINT", () => shutdown("SIGINT"));
    process.once("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Unable to start the application:", error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
