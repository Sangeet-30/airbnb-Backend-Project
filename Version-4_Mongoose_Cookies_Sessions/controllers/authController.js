exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login to airbnb",
    currentPage: "login",
    isLoggedIn: Boolean(req.session.isLoggedIn),
  });
};

// Learning demo only: this route demonstrates session handling and does not
// authenticate a real user. Add a user model and password verification later.
exports.postLogin = (req, res, next) => {
  req.session.regenerate((error) => {
    if (error) return next(error);

    req.session.isLoggedIn = true;
    req.session.save((saveError) => {
      if (saveError) return next(saveError);
      res.redirect("/login/success");
    });
  });
};

exports.getLoginSuccess = (req, res) => {
  if (!req.session.isLoggedIn) return res.redirect("/login");
  res.render("auth/loginSuccess", {
    pageTitle: "Login Successfully",
    currentPage: "login",
    isLoggedIn: true,
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie("airbnb.sid", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.redirect("/login");
  });
};
