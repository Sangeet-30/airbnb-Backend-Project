// Core modules
const path = require("path");

// External modules
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");

// Local modules
const authRouter = require("./routes/authRouter");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const pathDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGO_URL = process.env.MONGO_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

if (!MONGO_URL)
  throw new Error("Missing required environment variable: MONGO_URL");
if (!SESSION_SECRET)
  throw new Error("Missing required environment variable: SESSION_SECRET");

// Render and other reverse-proxy hosts terminate HTTPS before forwarding requests.
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.set("view engine", "ejs");
app.set("views", path.join(pathDir, "views"));
app.disable("x-powered-by");

app.use(express.urlencoded({ extended: false, limit: "10kb" }));
app.use(express.static(path.join(pathDir, "public")));

const sessionStore = new MongoDBStore({
  uri: MONGO_URL,
  collection: "sessions",
});
sessionStore.on("error", (error) => {
  console.error("Session store error:", error.message);
});

app.use(
  session({
    name: "airbnb.sid",
    secret: SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

// Make login state available consistently to every EJS template.
app.use((req, res, next) => {
  res.locals.isLoggedIn = Boolean(req.session.isLoggedIn);
  next();
});

app.use(authRouter);
app.use(storeRouter);

// Demo host-route guard. The login flow is for learning sessions only;
// it does not verify a real user account.
app.use("/host", (req, res, next) => {
  if (req.session.isLoggedIn) return next();
  return res.redirect("/login");
});
app.use("/host", hostRouter);

app.use(errorsController.get404);
app.use(errorsController.get500);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const shutdown = async (signal) => {
      console.log(`${signal} received. Closing server...`);
      server.close(async () => {
        await mongoose.disconnect();
        sessionStore.close(() => process.exit(0));
      });
    };

    process.once("SIGTERM", () => shutdown("SIGTERM"));
    process.once("SIGINT", () => shutdown("SIGINT"));
  })
  .catch((error) => {
    console.error("Unable to connect to MongoDB:", error.message);
    process.exitCode = 1;
  });
