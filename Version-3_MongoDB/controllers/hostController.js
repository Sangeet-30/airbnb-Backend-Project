const { ObjectId } = require("mongodb");
const House = require("../models/house");

const isValidObjectId = (id) => {
  if (!id) return false;
  return ObjectId.isValid(String(id)) && String(new ObjectId(String(id))) === String(id);
};

const renderForm = (res, { editing = false, house = null, errors = [] } = {}) =>
  res.status(errors.length ? 400 : 200).render("host/editHouse", {
    house,
    errors,
    pageTitle: editing ? "Edit your house" : "Add House to airbnb",
    currentPage: "host",
    editing,
  });

exports.getAddHouse = (req, res) => renderForm(res);

exports.getEditHouse = async (req, res, next) => {
  try {
    const house = await House.findById(req.params.houseId);
    if (!house) {
      return res.redirect("/host/host-houses-list");
    }
    renderForm(res, { house, editing: req.query.editing === "true" });
  } catch (error) {
    next(error);
  }
};

exports.getHostHouses = async (req, res, next) => {
  try {
    const registeredHouses = await House.fetchAll();
    res.render("host/hostHouseList", {
      registeredHouses,
      pageTitle: "Host Houses List",
      currentPage: "host",
    });
  } catch (error) {
    next(error);
  }
};

exports.postAddHouse = async (req, res, next) => {
  try {
    const { houseName, price, location, rating, photoUrl, description } = req.body;
    const house = new House(houseName, price, location, rating, photoUrl, description);
    const errors = house.validate();
    if (errors.length) {
      return renderForm(res, { house, errors });
    }

    await house.save();
    res.redirect("/host/host-houses-list");
  } catch (error) {
    next(error);
  }
};

exports.postEditHouse = async (req, res, next) => {
  try {
    const { id, houseName, price, location, rating, photoUrl, description } = req.body;
    if (!isValidObjectId(id)) {
      return res.redirect("/host/host-houses-list");
    }

    const house = new House(houseName, price, location, rating, photoUrl, description, id);
    const errors = house.validate();
    if (errors.length) {
      return renderForm(res, { house, editing: true, errors });
    }

    const result = await house.save();
    if (!result.matchedCount) {
      return res.redirect("/host/host-houses-list");
    }
    res.redirect("/host/host-houses-list");
  } catch (error) {
    next(error);
  }
};

exports.postDeleteHouse = async (req, res, next) => {
  try {
    await House.deleteById(req.params.houseId);
    res.redirect("/host/host-houses-list");
  } catch (error) {
    next(error);
  }
};
