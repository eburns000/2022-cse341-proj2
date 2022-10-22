const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
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
  },
  { collection: "library", timestamps: true }
);

// add pre method here, if at all
// schema.pre('save', () => console.log('Hello from pre save'));

module.exports = mongoose.model("Library", librarySchema);
