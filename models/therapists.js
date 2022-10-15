const mongoose = require("mongoose");

const therapistsSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    credentials: {
      type: String,
      required: true,
    },
    discipline: {
      type: String,
      required: true,
    }
  },
  { collection: "therapists" }
);

module.exports = mongoose.model("Therapists", therapistsSchema);
