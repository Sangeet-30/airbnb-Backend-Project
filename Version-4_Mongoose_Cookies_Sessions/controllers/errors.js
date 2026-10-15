exports.get404 = (req, res) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    currentPage: "404",
    isLoggedIn: Boolean(req.session?.isLoggedIn),
  });
};

exports.get500 = (error, req, res, next) => {
  console.error("Request failed:", error);
  if (res.headersSent) return next(error);

  res
    .status(500)
    .send(
      process.env.NODE_ENV === "production"
        ? "Something went wrong. Please try again later."
        : "Something went wrong. Check the server logs for details.",
    );
};
