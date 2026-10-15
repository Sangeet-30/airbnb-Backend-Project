const mongoose = require("mongoose");
const Favourite = require("./favourites");

const houseSchema = new mongoose.Schema(
  {
    houseName: { type: String, required: true, trim: true, maxlength: 100 },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true, maxlength: 150 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    photoUrl: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => !value || /^https?:\/\//i.test(value),
        message: "Photo URL must use HTTP or HTTPS.",
      },
    },
    description: { type: String, trim: true, maxlength: 2000, default: "" },
  },
  { timestamps: true },
);

houseSchema.pre("findOneAndDelete", async function () {
  const { _id } = this.getQuery() || {};
  if (_id) await Favourite.deleteMany({ houseId: _id });
});

module.exports = mongoose.model("House", houseSchema);
