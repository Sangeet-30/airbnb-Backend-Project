const House = require("../models/house");

exports.getAddHouse = (req, res, next) => {
  res.render("host/editHouse", {
    pageTitle: "Add House to airbnb",
    currentPage: "host",
    editing: false,
  });
};

exports.getEditHouse = async (req, res, next) => {
  try {
    const houseId = req.params.houseId;
    const editing = req.query.editing === "true";
    const [houses] = await House.findById(houseId);
    const house = houses[0];

    if (!house) {
      return res.redirect("/host/host-houses-list");
    }

    res.render("host/editHouse", {
      house,
      pageTitle: "Edit your house",
      currentPage: "host",
      editing,
    });
  } catch (err) {
    next(err);
  }
};

exports.getHostHouses = async (req, res, next) => {
  try {
    const [registeredHouses] = await House.fetchAll();
    res.render("host/hostHouseList", {
      registeredHouses,
      pageTitle: "Host Houses List",
      currentPage: "host",
    });
  } catch (err) {
    next(err);
  }
};

exports.postAddHouse = async (req, res, next) => {
  try {
    const { houseName, price, location, rating, photoUrl, description } =
      req.body;

    const house = new House(
      houseName,
      price,
      location,
      rating,
      photoUrl,
      description,
    );

    await house.save();

    res.render("host/houseAdded", {
      pageTitle: "House Added Successfully",
      currentPage: "host",
    });
  } catch (err) {
    next(err);
  }
};

exports.postEditHouse = async (req, res, next) => {
  try {
    const { id, houseName, price, location, rating, photoUrl, description } =
      req.body;

    const house = new House(
      houseName,
      price,
      location,
      rating,
      photoUrl,
      description,
      id,
    );

    await house.save();
    res.redirect("/host/host-houses-list");
  } catch (err) {
    next(err);
  }
};

exports.postDeleteHouse = async (req, res, next) => {
  try {
    await House.deleteById(req.params.houseId);
    res.redirect("/host/host-houses-list");
  } catch (err) {
    next(err);
  }
};
