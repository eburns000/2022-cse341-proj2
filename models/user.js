const mongoose = require("mongoose");
const librarySchema = require("./library");

const userSchema = new mongoose.Schema(
  {
    identifier: {
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
    assignedExercises: [librarySchema],
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
