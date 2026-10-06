// Core Modules
const db = require("../utils/databaseUtil");

module.exports = class Favourite {
  static addFavourite(houseId) {
    return db.execute(
      `INSERT INTO favourites (houseId)
       VALUES (?)
       ON DUPLICATE KEY UPDATE id = id`,
      [houseId],
    );
  }

  static getFavourites() {
    return db.execute(
      `SELECT h.*
       FROM favourites f
       INNER JOIN houses h ON h.id = f.houseId
       ORDER BY f.id DESC`,
    );
  }

  static deleteById(houseId) {
    return db.execute("DELETE FROM favourites WHERE houseId = ?", [houseId]);
  }
};
