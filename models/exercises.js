const { Schema } = require("mongoose");

const exerciseSchema = new Schema({
  exerciseName: {
    type: String,
    minLength: 3,
    maxLength: 25,
    required: true,
    unique: true,
  },
  instructions: {
    type: String,
    minLength: 15,
    maxLength: 500,
    required: true,
  },
});

// user and exercise will have a one-to-many relationship
// exerciseSchema is intended to not stand alone
// but to be for a nested schema within users
// the intent is to use this nested subdocuments in users
// to identify exercises that are assigned to the user
module.exports = exerciseSchema;
