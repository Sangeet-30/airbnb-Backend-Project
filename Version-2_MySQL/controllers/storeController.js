const Favourite = require("../models/favourites");
const House = require("../models/house");

exports.getIndex = async (req, res, next) => {
  try {
    const [registeredHouses] = await House.fetchAll();
    res.render("store/index", {
      registeredHouses,
      pageTitle: "airbnb Home Page",
      currentPage: "index",
    });
  } catch (err) {
    next(err);
  }
};

exports.getHouses = async (req, res, next) => {
  try {
    const [registeredHouses] = await House.fetchAll();
    res.render("store/houseList", {
      registeredHouses,
      pageTitle: "Houses List",
      currentPage: "housesList",
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const [favouriteHouses] = await Favourite.getFavourites();

    res.render("store/favouriteList", {
      favouriteHouses,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    });
  } catch (err) {
    next(err);
  }
};

exports.postAddToFavourite = async (req, res, next) => {
  try {
    await Favourite.addFavourite(req.body.id);
    res.redirect("/favourites");
  } catch (err) {
    next(err);
  }
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  try {
    await Favourite.deleteById(req.params.houseId);
    res.redirect("/favourites");
  } catch (err) {
    next(err);
  }
};

exports.getHouseDetails = async (req, res, next) => {
  try {
    const [houses] = await House.findById(req.params.houseId);
    const house = houses[0];

    if (!house) {
      return res.redirect("/houses");
    }

    res.render("store/houseDetails", {
      house,
      pageTitle: "House Details",
      currentPage: "housesList",
    });
  } catch (err) {
    next(err);
  }
};
