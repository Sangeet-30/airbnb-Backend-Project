const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/houses", storeController.getHouses);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouriteList);
storeRouter.get("/houses/:houseId", storeController.getHouseDetails);
storeRouter.post("/favourites", storeController.postAddToFavourite);
storeRouter.post(
  "/favourites/delete/:houseId",
  storeController.postRemoveFromFavourite,
);
storeRouter.get("/rules/:houseId", storeController.getHouseRules);
module.exports = storeRouter;
