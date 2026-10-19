const path = require("path");
const mongoose = require("mongoose");
const House = require("../models/house");
const User = require("../models/user");
const pathDir = require("../utils/pathUtil");

const viewData = (req, extra = {}) => ({
  isLoggedIn: Boolean(req.session?.isLoggedIn),
  user: req.session?.user || null,
  favouriteHouseIds: [],
  ...extra,
});

const getGuestFavouriteIds = async (req) => {
  if (
    req.session?.isLoggedIn &&
    req.session?.user?._id &&
    req.session.user.userType === "guest"
  ) {
    try {
      const user = await User.findById(req.session.user._id).select(
        "favourites",
      );
      if (user && user.favourites) {
        return user.favourites.map((id) => id.toString());
      }
    } catch (err) {
      console.error("Error fetching guest favourite IDs:", err);
    }
  }
  return [];
};

const requireLogin = (req, res) => {
  if (req.session?.isLoggedIn && req.session?.user?._id) return true;
  res.redirect("/login");
  return false;
};

const requireGuest = (req, res) => {
  if (!req.session?.isLoggedIn || !req.session?.user?._id) {
    res.redirect("/login");
    return false;
  }
  if (req.session.user.userType !== "guest") {
    res
      .status(403)
      .send(
        "Guest access required: This action is only available to guest accounts.",
      );
    return false;
  }
  return true;
};

exports.getIndex = async (req, res, next) => {
  try {
    const [registeredHouses, favouriteHouseIds] = await Promise.all([
      House.find()
        .populate("host", "firstName lastName email")
        .sort({ createdAt: -1 }),
      getGuestFavouriteIds(req),
    ]);
    res.render(
      "store/index",
      viewData(req, {
        registeredHouses,
        favouriteHouseIds,
        pageTitle: "airbnb Home Page",
        currentPage: "index",
      }),
    );
  } catch (err) {
    next(err);
  }
};

exports.getHouses = async (req, res, next) => {
  // If not logged in, prompt user to log in or sign up to explore houses
  if (!req.session?.isLoggedIn || !req.session?.user?._id) {
    return res.render(
      "store/authPrompt",
      viewData(req, {
        pageTitle: "Log in to Explore Houses",
        currentPage: "exploreHouses",
      }),
    );
  }
  if (req.session.user.userType !== "guest") {
    return res
      .status(403)
      .send(
        "Guest access required: This page can only be accessed by guest users.",
      );
  }
  try {
    const [registeredHouses, favouriteHouseIds] = await Promise.all([
      House.find()
        .populate("host", "firstName lastName email")
        .sort({ createdAt: -1 }),
      getGuestFavouriteIds(req),
    ]);
    res.render(
      "store/houseList",
      viewData(req, {
        registeredHouses,
        favouriteHouseIds,
        pageTitle: "Houses List",
        currentPage: "housesList",
      }),
    );
  } catch (err) {
    next(err);
  }
};

exports.getBookings = (req, res) => {
  if (!requireGuest(req, res)) return;
  res.render(
    "store/bookings",
    viewData(req, {
      pageTitle: "My Bookings",
      currentPage: "bookings",
    }),
  );
};

exports.getFavouriteList = async (req, res, next) => {
  if (!requireGuest(req, res)) return;
  try {
    const user = await User.findById(req.session.user._id).populate({
      path: "favourites",
      populate: { path: "host", select: "firstName lastName email" },
    });
    if (!user) return res.redirect("/logout");
    const favouriteHouseIds = (user.favourites || []).map((fav) =>
      (fav._id || fav).toString(),
    );
    res.render(
      "store/favouriteList",
      viewData(req, {
        favouriteHouses: user.favourites,
        favouriteHouseIds,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      }),
    );
  } catch (err) {
    next(err);
  }
};

exports.postAddToFavourite = async (req, res, next) => {
  if (!requireGuest(req, res)) return;
  try {
    const { id } = req.body;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).send("Invalid house ID.");
    const [user, house] = await Promise.all([
      User.findById(req.session.user._id),
      House.findById(id),
    ]);
    if (!user || !house)
      return res.status(404).send("User or house not found.");
    if (!user.favourites.some((fav) => fav.equals(house._id))) {
      user.favourites.push(house._id);
      await user.save();
    }
    const redirectUrl = req.get("Referrer") || "/favourites";
    res.redirect(redirectUrl);
  } catch (err) {
    next(err);
  }
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  if (!requireGuest(req, res)) return;
  try {
    const { houseId } = req.params;
    if (!mongoose.isValidObjectId(houseId))
      return res.status(400).send("Invalid house ID.");
    const user = await User.findById(req.session.user._id);
    if (!user) return res.redirect("/login");
    user.favourites = user.favourites.filter((fav) => !fav.equals(houseId));
    await user.save();
    const redirectUrl = req.get("Referrer") || "/favourites";
    res.redirect(redirectUrl);
  } catch (err) {
    next(err);
  }
};

exports.getHouseDetails = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.houseId))
      return res.redirect("/houses");
    const [house, favouriteHouseIds] = await Promise.all([
      House.findById(req.params.houseId).populate(
        "host",
        "firstName lastName email",
      ),
      getGuestFavouriteIds(req),
    ]);
    if (!house) return res.redirect("/houses");
    res.render(
      "store/houseDetails",
      viewData(req, {
        house,
        favouriteHouseIds,
        pageTitle: "House Details",
        currentPage: "housesList",
      }),
    );
  } catch (err) {
    next(err);
  }
};

exports.getHouseRules = (req, res, next) => {
  if (!requireLogin(req, res)) return;
  const filepath = path.join(pathDir, "rules", "House Rules.pdf");
  res.download(filepath, "Rules.pdf", (err) => {
    if (err && !res.headersSent) next(err);
  });
};
