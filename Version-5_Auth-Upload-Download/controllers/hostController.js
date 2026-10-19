const fs = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");
const House = require("../models/house");
const pathDir = require("../utils/pathUtil");

const viewData = (req, extra = {}) => ({
  isLoggedIn: Boolean(req.session?.isLoggedIn),
  user: req.session?.user || null,
  ...extra,
});
const validId = (id) => mongoose.isValidObjectId(id);
const unlinkUpload = async (relativePath) => {
  if (!relativePath) return;
  const absolute = path.resolve(pathDir, relativePath);
  const uploadsRoot = path.resolve(pathDir, "uploads") + path.sep;
  if (!absolute.startsWith(uploadsRoot)) return;
  await fs.unlink(absolute).catch((err) => {
    if (err.code !== "ENOENT")
      console.error("Could not remove old upload:", err.message);
  });
};

exports.getAddHouse = (req, res) =>
  res.render(
    "host/editHouse",
    viewData(req, {
      pageTitle: "Add House to airbnb",
      currentPage: "addHouse",
      editing: false,
    }),
  );

exports.getEditHouse = async (req, res, next) => {
  try {
    const { houseId } = req.params;
    if (!validId(houseId)) return res.status(400).send("Invalid house ID.");
    const house = await House.findOne({
      _id: houseId,
      host: req.session.user._id,
    });
    if (!house) return res.status(404).send("House not found.");
    res.render(
      "host/editHouse",
      viewData(req, {
        house,
        pageTitle: "Edit your house",
        currentPage: "hostHouseList",
        editing: true,
      }),
    );
  } catch (err) {
    next(err);
  }
};

exports.getHostHouses = async (req, res, next) => {
  try {
    const registeredHouses = await House.find({
      host: req.session.user._id,
    }).sort({ createdAt: -1 });
    res.render(
      "host/hostHouseList",
      viewData(req, {
        registeredHouses,
        pageTitle: "Host Houses List",
        currentPage: "hostHouseList",
      }),
    );
  } catch (err) {
    next(err);
  }
};

exports.postAddHouse = async (req, res, next) => {
  try {
    const { houseName, price, location, rating, description } = req.body;
    if (!req.file)
      return res
        .status(422)
        .send("Please upload a JPG or PNG image (maximum 5 MB).");
    const house = new House({
      houseName,
      price: Number(price),
      location,
      rating: Number(rating),
      description,
      photo: path.posix.join("uploads", req.file.filename),
      host: req.session.user._id,
    });
    await house.save();
    res.render(
      "host/houseAdded",
      viewData(req, {
        pageTitle: "House Added Successfully",
        currentPage: "addHouse",
      }),
    );
  } catch (err) {
    if (req.file)
      await unlinkUpload(path.posix.join("uploads", req.file.filename));
    if (err.name === "ValidationError" || err.name === "CastError")
      return res
        .status(422)
        .send("Please check the house details and try again.");
    next(err);
  }
};

exports.postEditHouse = async (req, res, next) => {
  let newUpload;
  try {
    const { id, houseName, price, location, rating, description } = req.body;
    if (!validId(id)) return res.status(400).send("Invalid house ID.");
    const house = await House.findOne({ _id: id, host: req.session.user._id });
    if (!house) return res.status(404).send("House not found.");
    if (req.file) {
      newUpload = path.posix.join("uploads", req.file.filename);
      house.photo = newUpload;
    }
    house.houseName = houseName;
    house.price = Number(price);
    house.location = location;
    house.rating = Number(rating);
    house.description = description;
    await house.save();
    if (newUpload) await unlinkUpload(req.body.oldPhoto);
    res.redirect("/host/host-houses-list");
  } catch (err) {
    if (req.file)
      await unlinkUpload(path.posix.join("uploads", req.file.filename));
    if (err.name === "ValidationError" || err.name === "CastError")
      return res
        .status(422)
        .send("Please check the house details and try again.");
    next(err);
  }
};

exports.postDeleteHouse = async (req, res, next) => {
  try {
    const { houseId } = req.params;
    if (!validId(houseId)) return res.status(400).send("Invalid house ID.");
    const house = await House.findOneAndDelete({
      _id: houseId,
      host: req.session.user._id,
    });
    if (!house) return res.status(404).send("House not found.");
    await unlinkUpload(house.photo);
    res.redirect("/host/host-houses-list");
  } catch (err) {
    next(err);
  }
};
