const mongoose = require("mongoose");

const librarySchema = mongoose.Schema(
  {
    exerciseName: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
  },
  { collection: "library" }
);

module.exports = mongoose.model("Library", librarySchema);
