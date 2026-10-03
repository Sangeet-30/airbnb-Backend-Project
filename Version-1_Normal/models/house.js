// Core Module
const fs = require("fs");
const path = require("path");
const pathDir = require("../utils/pathUtil");
const Favourite = require("./favourites");

const homePath = path.join(pathDir, "data", "houses.json");

module.exports = class House {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    House.fetchAll((registeredHouses) => {
      if (this.id) {
        // update house
        const existingHouseIndex = registeredHouses.findIndex(
          (house) => house.id === this.id,
        );

        if (existingHouseIndex !== -1) {
          registeredHouses[existingHouseIndex] = this;
        }
      } else {
        // add house
        this.id = String(Math.random());
        registeredHouses.push(this);
      }

      fs.writeFile(homePath, JSON.stringify(registeredHouses), (err) => {
        console.log("File Writing Concluded", err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homePath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(houseId, callback) {
    this.fetchAll((houses) => {
      const houseFound = houses.find((house) => house.id === houseId);
      callback(houseFound);
    });
  }

  static deleteById(houseId, callback) {
    this.fetchAll((houses) => {
      houses = houses.filter((house) => house.id !== houseId);
      fs.writeFile(homePath, JSON.stringify(houses), (err) => {
        Favourite.deleteById(houseId, callback);
      });
    });
  }
};
