// Core Modules
const db = require("../utils/databaseUtil");

module.exports = class House {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) {
      return db.execute(
        "UPDATE houses SET houseName=?, price=?, location=?, rating=?, photoUrl=?, description=? WHERE id=?",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
          this.id,
        ],
      );
    } else {
      return db.execute(
        "INSERT INTO houses (houseName, price, location, rating, photoUrl, description) VALUES (?,?,?,?,?,? )",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
        ],
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM houses");
  }

  static findById(houseId) {
    return db.execute("SELECT * FROM houses WHERE id=?", [houseId]);
  }

  static deleteById(houseId) {
    return db.execute("DELETE FROM houses WHERE id=?", [houseId]);
  }
};
