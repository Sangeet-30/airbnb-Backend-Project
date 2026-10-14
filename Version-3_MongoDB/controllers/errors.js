exports.get404 = (req, res) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    currentPage: "404",
  });
};

exports.handleError = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = Number(error.status) || 500;
  if (status >= 500) {
    console.error("Internal Server Error:", error);
  }

  res.status(status).render("500", {
    pageTitle: "Error",
    currentPage: "500",
    errorMessage:
      status < 500
        ? error.message
        : "An unexpected error occurred. Please try again later.",
  });
};
