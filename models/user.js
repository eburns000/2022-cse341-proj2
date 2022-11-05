const mongoose = require("mongoose");
const exerciseSchema = require("./exerciseSchema");

const userSchema = new mongoose.Schema(
  {
    identifier: { // sub value from Google
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    givenName: {
      type: String,
      required: true,
    },
    familyName: {
      type: String,
      required: true,
    },
    locale: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    assignedExercises: [exerciseSchema],
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
