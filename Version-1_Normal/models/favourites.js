// Core Module
const fs = require("fs");
const path = require("path");
const pathDir = require("../utils/pathUtil");

const favouriteDataPath = path.join(pathDir, "data", "favourite.json");

module.exports = class Favourite {
  static addFavourite(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Home already present");
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deleteById(delHouseId, callback) {
    Favourite.getFavourites((houseIds) => {
      houseIds = houseIds.filter((houseId) => delHouseId !== houseId);
      fs.writeFile(favouriteDataPath, JSON.stringify(houseIds), callback);
    });
  }
};
