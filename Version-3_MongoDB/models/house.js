const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");

const isValidObjectId = (id) => {
  if (!id) return false;
  return ObjectId.isValid(String(id)) && String(new ObjectId(String(id))) === String(id);
};

module.exports = class House {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = String(houseName || "").trim();
    this.price = Number(price);
    this.location = String(location || "").trim();
    this.rating = Number(rating);
    this.photoUrl = String(photoUrl || "").trim();
    this.description = String(description || "").trim();
    if (_id) {
      this._id = String(_id);
    }
  }

  validate() {
    const errors = [];
    if (!this.houseName) {
      errors.push("House name is required.");
    } else if (this.houseName.length > 100) {
      errors.push("House name cannot exceed 100 characters.");
    }

    if (!this.location) {
      errors.push("Location is required.");
    } else if (this.location.length > 150) {
      errors.push("Location cannot exceed 150 characters.");
    }

    if (!Number.isFinite(this.price) || this.price <= 0) {
      errors.push("Price must be a number greater than zero.");
    }

    if (!Number.isFinite(this.rating) || this.rating < 0 || this.rating > 5) {
      errors.push("Rating must be a number between 0 and 5.");
    }

    if (this.photoUrl) {
      try {
        const url = new URL(this.photoUrl);
        if (!["http:", "https:"].includes(url.protocol)) {
          errors.push("Photo URL must use HTTP or HTTPS.");
        }
      } catch {
        errors.push("Please enter a valid photo URL.");
      }
    }

    if (this.description && this.description.length > 2000) {
      errors.push("Description cannot exceed 2000 characters.");
    }

    return errors;
  }

  toDocument() {
    return {
      houseName: this.houseName,
      price: this.price,
      location: this.location,
      rating: this.rating,
      photoUrl: this.photoUrl,
      description: this.description,
    };
  }

  async save() {
    const errors = this.validate();
    if (errors.length) {
      const error = new Error(errors.join(" "));
      error.status = 400;
      throw error;
    }

    const db = getDB();
    if (this._id) {
      if (!isValidObjectId(this._id)) {
        const error = new Error("Invalid house ID for update");
        error.status = 400;
        throw error;
      }
      return db.collection("houses").updateOne(
        { _id: new ObjectId(String(this._id)) },
        { $set: this.toDocument() }
      );
    }

    return db.collection("houses").insertOne(this.toDocument());
  }

  static fetchAll() {
    return getDB().collection("houses").find().sort({ _id: -1 }).toArray();
  }

  static async findById(houseId) {
    if (!isValidObjectId(houseId)) {
      return null;
    }
    return getDB().collection("houses").findOne({ _id: new ObjectId(String(houseId)) });
  }

  static async deleteById(houseId) {
    if (!isValidObjectId(houseId)) {
      return { deletedCount: 0 };
    }
    const db = getDB();
    const objectId = new ObjectId(String(houseId));
    const result = await db.collection("houses").deleteOne({ _id: objectId });
    if (result.deletedCount > 0) {
      await db.collection("favourite").deleteMany({ houseId: String(houseId) });
    }
    return result;
  }
};
