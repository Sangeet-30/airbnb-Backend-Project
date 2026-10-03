const House = require("../models/house");

exports.getAddHouse = (req, res, next) => {
  res.render("host/editHouse", {
    pageTitle: "Add House to airbnb",
    currentPage: "host",
    editing: false,
  });
};

exports.getEditHouse = (req, res, next) => {
  const houseId = req.params.houseId;
  const editing = req.query.editing === "true";

  House.findById(houseId, (house) => {
    if (!house) {
      console.log("House not found for editing");
      return res.redirect("/host/host-houses-list");
    }
    console.log(houseId, editing, house);
    res.render("host/editHouse", {
      house: house,
      pageTitle: "Edit your house",
      currentPage: "host",
      editing: editing,
    });
  });
};

exports.getHostHouses = (req, res, next) => {
  House.fetchAll((registeredHouses) => {
    res.render("host/hostHouseList", {
      registeredHouses: registeredHouses,
      pageTitle: "Host Houses List",
      currentPage: "host",
    });
  });
};

exports.postAddHouse = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;

  const house = new House(houseName, price, location, rating, photoUrl);
  house.save();

  res.render("host/houseAdded", {
    pageTitle: "House Added Successfully",
    currentPage: "host",
  });
};

exports.postEditHouse = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body;

  const house = new House(houseName, price, location, rating, photoUrl);
  house.id = id;
  house.save();

  res.redirect("/host/host-houses-list");
};

exports.postDeleteHouse = (req, res, next) => {
  const houseId = req.params.houseId;
  console.log("Delete House: ", houseId);
  House.deleteById(houseId, (err) => {
    if (err) {
      console.log("Error found while deleting", err);
    }
    res.redirect("/host/host-houses-list");
  });
};
