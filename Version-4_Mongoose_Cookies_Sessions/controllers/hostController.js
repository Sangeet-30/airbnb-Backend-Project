const mongoose = require("mongoose");
const House = require("../models/house");

const renderHouseForm = (res, options) => res.render("host/editHouse", options);

exports.getAddHouse = (req, res) => {
  renderHouseForm(res, {
    pageTitle: "Add House to airbnb",
    currentPage: "host",
    editing: false,
  });
};

exports.getEditHouse = async (req, res, next) => {
  try {
    const { houseId } = req.params;
    if (!mongoose.isValidObjectId(houseId))
      return res.redirect("/host/host-houses-list");

    const house = await House.findById(houseId);
    if (!house) return res.redirect("/host/host-houses-list");

    return renderHouseForm(res, {
      house,
      pageTitle: "Edit your house",
      currentPage: "host",
      editing: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.getHostHouses = async (req, res, next) => {
  try {
    const registeredHouses = await House.find().sort({ _id: -1 }).lean();
    res.render("host/hostHouseList", {
      registeredHouses,
      pageTitle: "Host Houses List",
      currentPage: "host",
    });
  } catch (error) {
    next(error);
  }
};

const getHouseInput = (body) => ({
  houseName: String(body.houseName || "").trim(),
  price: Number(body.price),
  location: String(body.location || "").trim(),
  rating: Number(body.rating),
  photoUrl: String(body.photoUrl || "").trim(),
  description: String(body.description || "").trim(),
});

const validateHouseInput = (data) => {
  if (!data.houseName || !data.location)
    return "House name and location are required.";
  if (!Number.isFinite(data.price) || data.price <= 0)
    return "Price must be a number greater than zero.";
  if (!Number.isFinite(data.rating) || data.rating < 0 || data.rating > 5)
    return "Rating must be between 0 and 5.";
  if (data.photoUrl && !/^https?:\/\//i.test(data.photoUrl))
    return "Photo URL must start with http:// or https://.";
  return null;
};

exports.postAddHouse = async (req, res, next) => {
  try {
    const data = getHouseInput(req.body);
    const validationError = validateHouseInput(data);
    if (validationError) return res.status(400).send(validationError);

    await House.create(data);
    res.redirect("/host/host-houses-list");
  } catch (error) {
    next(error);
  }
};

exports.postEditHouse = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).send("Invalid house ID.");

    const data = getHouseInput(req.body);
    const validationError = validateHouseInput(data);
    if (validationError) return res.status(400).send(validationError);

    const house = await House.findById(id);
    if (!house) return res.status(404).send("House not found.");

    Object.assign(house, data);
    await house.save();
    res.redirect("/host/host-houses-list");
  } catch (error) {
    next(error);
  }
};

exports.postDeleteHouse = async (req, res, next) => {
  try {
    const { houseId } = req.params;
    if (!mongoose.isValidObjectId(houseId))
      return res.status(400).send("Invalid house ID.");

    const deletedHouse = await House.findByIdAndDelete(houseId);
    if (!deletedHouse) return res.status(404).send("House not found.");

    res.redirect("/host/host-houses-list");
  } catch (error) {
    next(error);
  }
};
