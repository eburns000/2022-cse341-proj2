const mongoose = require("mongoose");

const locationsSchema = mongoose.Schema(
  {
    locationName: {
      type: String,
      required: true,
    },
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    phone: { type: String }
  },
  { collection: "locations" }
);

module.exports = mongoose.model("Locations", locationsSchema);
