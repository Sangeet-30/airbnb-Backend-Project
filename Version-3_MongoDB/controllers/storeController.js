const { ObjectId } = require("mongodb");
const Favourite = require("../models/favourites");
const House = require("../models/house");
const { getDB } = require("../utils/databaseUtil");

exports.getIndex = async (req, res, next) => {
  try {
    const registeredHouses = await House.fetchAll();
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
    const registeredHouses = await House.fetchAll();
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
    const favourites = await Favourite.getFavourites();
    const favObjectIds = favourites
      .map((fav) => fav.houseId)
      .filter((id) => ObjectId.isValid(id) && String(new ObjectId(id)) === String(id))
      .map((id) => new ObjectId(id));

    const favouriteHouses = favObjectIds.length > 0
      ? await getDB().collection("houses").find({ _id: { $in: favObjectIds } }).toArray()
      : [];

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
    const houseId = String(req.body.id || "").trim();
    const house = await House.findById(houseId);
    if (!house) {
      return res.redirect("/houses");
    }
    await new Favourite(houseId).save();
    res.redirect("/favourites");
  } catch (error) {
    next(error);
  }
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  try {
    await Favourite.deleteById(req.params.houseId);
    res.redirect("/favourites");
  } catch (error) {
    next(error);
  }
};

exports.getReserve = async (req, res, next) => {
  try {
    const house = await House.findById(req.params.houseId);
    if (!house) {
      return res.redirect("/houses");
    }
    res.render("store/reserve", {
      house,
      pageTitle: `Reserve — ${house.houseName}`,
      currentPage: "bookings",
    });
  } catch (error) {
    next(error);
  }
};

exports.getHouseDetails = async (req, res, next) => {
  try {
    const house = await House.findById(req.params.houseId);
    if (!house) {
      return res.redirect("/houses");
    }
    res.render("store/houseDetails", {
      house,
      pageTitle: "House Details",
      currentPage: "housesList",
    });
  } catch (error) {
    next(error);
  }
};
