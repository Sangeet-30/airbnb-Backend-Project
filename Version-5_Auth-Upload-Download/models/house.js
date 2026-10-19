const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    houseName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true, maxlength: 120 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    photo: { type: String, default: "" },
    description: { type: String, trim: true, maxlength: 2000, default: "" },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("House", houseSchema);
