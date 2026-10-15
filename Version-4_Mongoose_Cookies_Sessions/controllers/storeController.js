const mongoose = require("mongoose");
const Favourite = require("../models/favourites");
const House = require("../models/house");

exports.getIndex = async (req, res, next) => {
  try {
    const registeredHouses = await House.find().sort({ _id: -1 }).lean();
    res.render("store/index", {
      registeredHouses,
      pageTitle: "airbnb Home Page",
      currentPage: "index",
    });
  } catch (error) {
    next(error);
  }
};

exports.getHouses = async (req, res, next) => {
  try {
    const registeredHouses = await House.find().sort({ _id: -1 }).lean();
    res.render("store/houseList", {
      registeredHouses,
      pageTitle: "Houses List",
      currentPage: "housesList",
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const favourites = await Favourite.find().populate("houseId").lean();
    const favouriteHouses = favourites
      .map((favourite) => favourite.houseId)
      .filter(Boolean);

    res.render("store/favouriteList", {
      favouriteHouses,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    });
  } catch (error) {
    next(error);
  }
};

exports.postAddToFavourite = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).send("Invalid house ID.");

    const houseExists = await House.exists({ _id: id });
    if (!houseExists) return res.status(404).send("House not found.");

    await Favourite.updateOne(
      { houseId: id },
      { $setOnInsert: { houseId: id } },
      { upsert: true, runValidators: true },
    );
    res.redirect("/favourites");
  } catch (error) {
    next(error);
  }
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  try {
    const { houseId } = req.params;
    if (!mongoose.isValidObjectId(houseId))
      return res.status(400).send("Invalid house ID.");

    await Favourite.findOneAndDelete({ houseId });
    res.redirect("/favourites");
  } catch (error) {
    next(error);
  }
};

exports.getHouseDetails = async (req, res, next) => {
  try {
    const { houseId } = req.params;
    if (!mongoose.isValidObjectId(houseId)) return res.redirect("/houses");

    const house = await House.findById(houseId).lean();
    if (!house) return res.redirect("/houses");

    res.render("store/houseDetails", {
      house,
      pageTitle: "House Details",
      currentPage: "housesList",
    });
  } catch (error) {
    next(error);
  }
};
