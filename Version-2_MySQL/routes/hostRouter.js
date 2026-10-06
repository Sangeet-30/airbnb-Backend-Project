// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const hostController = require("../controllers/hostController");

hostRouter.get("/add-house", hostController.getAddHouse);
hostRouter.post("/add-house", hostController.postAddHouse);
hostRouter.get("/host-houses-list", hostController.getHostHouses);
hostRouter.get("/edit-house/:houseId", hostController.getEditHouse);
hostRouter.post("/edit-house", hostController.postEditHouse);
hostRouter.post("/delete-house/:houseId", hostController.postDeleteHouse);

module.exports = hostRouter;
