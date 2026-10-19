const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 60 },
    lastName: { type: String, trim: true, maxlength: 60, default: "" },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true, select: false },
    userType: {
      type: String,
      enum: ["guest", "host"],
      default: "guest",
      required: true,
    },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "House" }],
  },
  { timestamps: true },
);
module.exports = mongoose.model("User", userSchema);
