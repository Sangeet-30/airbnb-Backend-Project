const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");

const isValidObjectId = (id) => {
  if (!id) return false;
  return ObjectId.isValid(String(id)) && String(new ObjectId(String(id))) === String(id);
};

module.exports = class Favourite {
  constructor(houseId) {
    if (!isValidObjectId(houseId)) {
      const error = new Error("Invalid house ID");
      error.status = 400;
      throw error;
    }
    this.houseId = String(houseId);
  }

  async save() {
    const db = getDB();
    return db.collection("favourite").updateOne(
      { houseId: this.houseId },
      { $setOnInsert: { houseId: this.houseId } },
      { upsert: true }
    );
  }

  static getFavourites() {
    return getDB().collection("favourite").find({}, { projection: { houseId: 1 } }).toArray();
  }

  static deleteById(houseId) {
    if (!houseId) return Promise.resolve({ deletedCount: 0 });
    return getDB().collection("favourite").deleteMany({ houseId: String(houseId) });
  }
};
