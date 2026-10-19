require('dotenv').config();

// Core modules
const path = require('path');

// External modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');

// Local modules
const authRouter = require('./routes/authRouter');
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const pathDir = require('./utils/pathUtil');
const errorsController = require('./controllers/errors');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGO_URL = process.env.MONGO_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

if (!MONGO_URL || !SESSION_SECRET) {
  console.error('Missing required environment variables: MONGO_URL and/or SESSION_SECRET');
  process.exit(1);
}

app.set('view engine', 'ejs');
app.set('views', path.join(pathDir, 'views'));
if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);

const store = new MongoDBStore({ uri: MONGO_URL, collection: 'sessions' });
store.on('error', (err) => console.error('Session store error:', err.message));

app.use(express.urlencoded({ extended: false, limit: '20kb' }));
app.use(express.static(path.join(pathDir, 'public')));

app.use(session({
  name: 'airbnb.sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));

// Make session state consistently available to EJS views.
app.use((req, res, next) => {
  res.locals.isLoggedIn = Boolean(req.session?.isLoggedIn);
  res.locals.user = req.session?.user || null;
  next();
});

const { storage: cloudinaryStorage } = require('./utils/cloudinary');

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const uploadPhoto = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedMimeTypes.has(file.mimetype) || !allowedExtensions.has(ext)) {
      return cb(new Error('Only JPG, PNG, and WebP images up to 5 MB are allowed.'));
    }
    cb(null, true);
  },
}).single('photo');

// Apply upload middleware only to routes that accept a photo.
app.use('/host/add-house', (req, res, next) => req.method === 'POST' ? uploadPhoto(req, res, next) : next());
app.use('/host/edit-house', (req, res, next) => req.method === 'POST' ? uploadPhoto(req, res, next) : next());

app.use(authRouter);
app.use(storeRouter);

// Authentication and authorization for host routes.
app.use('/host', (req, res, next) => {
  if (!req.session?.isLoggedIn || !req.session?.user) return res.redirect('/login');
  if (req.session.user.userType !== 'host') return res.status(403).send('Host access required.');
  next();
});
app.use('/host', hostRouter);

app.use(errorsController.get404);
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (
    err instanceof multer.MulterError ||
    err.http_code === 403 ||
    err.name === "UnexpectedResponse" ||
    /Only JPG|cloudinary|upload|format/i.test(err.message || "")
  ) {
    console.error("Cloudinary / Upload Error:", {
      message: err.message,
      http_code: err.http_code,
      name: err.name,
      code: err.code,
    });
    let errorMsg = err.message || "Invalid upload.";
    if (err.code === "LIMIT_FILE_SIZE") {
      errorMsg = "File size exceeds 5 MB limit. Please upload a smaller image.";
    } else if (err.message && /missing permissions/i.test(err.message)) {
      errorMsg = "Cloudinary upload failed: API key has restricted permissions in Cloudinary console.";
    } else if (err.message && /format.*not allowed/i.test(err.message)) {
      errorMsg = "Only JPG, PNG, and WebP images up to 5 MB are allowed.";
    }
    return res.status(400).send(errorMsg);
  }
  console.error(err);
  res.status(500).render('404', {
    pageTitle: 'Server Error', currentPage: 'error', isLoggedIn: Boolean(req.session?.isLoggedIn),
    user: req.session?.user || null,
  });
});

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

async function shutdown(signal) {
  console.log(`${signal} received; shutting down...`);
  await mongoose.disconnect();
  store.close?.();
  process.exit(0);
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
