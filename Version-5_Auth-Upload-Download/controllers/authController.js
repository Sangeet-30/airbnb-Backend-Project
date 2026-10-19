const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const renderLogin = (res, status, errors, email = "") =>
  res.status(status).render("auth/login", {
    pageTitle: "Log-in to airbnb",
    currentPage: "login",
    isLoggedIn: false,
    errors,
    oldInput: { email },
    user: {},
  });

const renderSignup = (res, status, errors, oldInput = {}) =>
  res.status(status).render("auth/signup", {
    pageTitle: "Sign-up to airbnb",
    currentPage: "signup",
    isLoggedIn: false,
    errors,
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      userType: "",
      ...oldInput,
    },
    user: {},
  });

exports.getLogin = (_req, res) => renderLogin(res, 200, []);
exports.getSignup = (_req, res) => renderSignup(res, 200, []);

exports.postSignup = [
  body("firstName")
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage("First name must be 2–60 characters.")
    .matches(/^[A-Za-z\s'-]+$/)
    .withMessage("First Name should only contain alphabets."),

  body("lastName")
    .trim()
    .isLength({ max: 60 })
    .withMessage("Last name is too long.")
    .matches(/^[A-Za-z\s'-]*$/)
    .withMessage("Last name contains invalid characters."),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address.")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must be 8–72 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password needs an uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password needs a lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password needs a number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password needs a special character."),

  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),

  body("userType")
    .isIn(["guest", "host"])
    .withMessage("Choose a valid user type."),

  body("terms")
    .equals("on")
    .withMessage("Please accept the terms and conditions."),

  async (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return renderSignup(
        res,
        422,
        errors.array().map((e) => e.msg),
        { firstName, lastName, email, userType },
      );
    try {
      const existing = await User.findOne({ email }).select("+password");
      if (existing)
        return renderSignup(
          res,
          409,
          ["An account with this email already exists."],
          { firstName, lastName, email, userType },
        );
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType,
      });
      res.redirect("/login");
    } catch (err) {
      if (err.code === 11000)
        return renderSignup(
          res,
          409,
          ["An account with this email already exists."],
          { firstName, lastName, email, userType },
        );
      next(err);
    }
  },
];

exports.postLogin = async (req, res, next) => {
  const email = String(req.body.email || "")
    .trim()
    .toLowerCase();
  const password = String(req.body.password || "");
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password)))
      return renderLogin(res, 422, ["Invalid email or password."], email);
    
    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.isLoggedIn = true;
      req.session.user = {
        _id: user._id.toString(),
        userType: user.userType,
        firstName: user.firstName,
      };
      req.session.save((saveErr) =>
        saveErr ? next(saveErr) : res.redirect("/"),
      );
    });
  } catch (err) {
    next(err);
  }
};

exports.postLogout = (req, res, next) => {
  if (!req.session) return res.redirect("/login");
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("airbnb.sid", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.redirect("/login");
  });
};
