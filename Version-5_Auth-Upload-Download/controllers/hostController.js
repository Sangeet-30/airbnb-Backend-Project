const mongoose = require("mongoose");
const House = require("../models/house");
const { deleteCloudinaryImage } = require("../utils/cloudinary");

const viewData = (req, extra = {}) => ({
  isLoggedIn: Boolean(req.session?.isLoggedIn),
  user: req.session?.user || null,
  ...extra,
});
const validId = (id) => mongoose.isValidObjectId(id);

const deletePhoto = async (photoPath, publicId) => {
  if (!photoPath && !publicId) return;
  await deleteCloudinaryImage(photoPath, publicId);
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

    const photoUrl = req.file.path;
    const photoPublicId = req.file.filename;

    const house = new House({
      houseName,
      price: Number(price),
      location,
      rating: Number(rating),
      description,
      photo: photoUrl,
      photoPublicId,
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
    if (req.file) {
      await deletePhoto(req.file.path, req.file.filename);
    }
    if (err.name === "ValidationError" || err.name === "CastError")
      return res
        .status(422)
        .send("Please check the house details and try again.");
    next(err);
  }
};

exports.postEditHouse = async (req, res, next) => {
  let uploadedFile = false;
  try {
    const { id, houseName, price, location, rating, description } = req.body;
    if (!validId(id)) return res.status(400).send("Invalid house ID.");
    const house = await House.findOne({ _id: id, host: req.session.user._id });
    if (!house) return res.status(404).send("House not found.");

    const oldPhoto = house.photo;
    const oldPhotoPublicId = house.photoPublicId;

    if (req.file) {
      house.photo = req.file.path;
      house.photoPublicId = req.file.filename;
      uploadedFile = true;
    }

    house.houseName = houseName;
    house.price = Number(price);
    house.location = location;
    house.rating = Number(rating);
    house.description = description;
    await house.save();

    if (uploadedFile && (oldPhoto || oldPhotoPublicId)) {
      await deletePhoto(oldPhoto, oldPhotoPublicId);
    }
    res.redirect("/host/host-houses-list");
  } catch (err) {
    if (req.file) {
      await deletePhoto(req.file.path, req.file.filename);
    }
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
    await deletePhoto(house.photo, house.photoPublicId);
    res.redirect("/host/host-houses-list");
  } catch (err) {
    next(err);
  }
};
