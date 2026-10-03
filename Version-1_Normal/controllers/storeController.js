const Favourite = require("../models/favourites");
const House = require("../models/house");

exports.getIndex = (req, res, next) => {
  House.fetchAll((registeredHouses) => {
    res.render("store/index", {
      registeredHouses: registeredHouses,
      pageTitle: "airbnb Home Page",
      currentPage: "index",
    });
  });
};

exports.getHouses = (req, res, next) => {
  House.fetchAll((registeredHouses) => {
    res.render("store/houseList", {
      registeredHouses: registeredHouses,
      pageTitle: "Houses List",
      currentPage: "housesList",
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites((favourites) => {
    House.fetchAll((registeredHouses) => {
      const favouriteHouses = registeredHouses.filter((house) =>
        favourites.includes(house.id),
      );
      res.render("store/favouriteList", {
        favouriteHouses: favouriteHouses,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  console.log("Add to favourite:", req.body);
  Favourite.addFavourite(req.body.id, (err) => {
    if (err) {
      console.log("Error found:", err);
    }
    res.redirect("/favourites");
  });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const houseId = req.params.houseId;
  Favourite.deleteById(houseId, (err) => {
    if (err) {
      console.log("Error while removing Favourite", err);
    }
    res.redirect("/favourites");
  });
};

exports.getHouseDetails = (req, res, next) => {
  const houseId = req.params.houseId;
  House.findById(houseId, (house) => {
    if (!house) {
      res.redirect("/houses");
    } else {
      res.render("store/houseDetails", {
        house: house,
        pageTitle: "House Details",
        currentPage: "housesList",
      });
    }
  });
};
