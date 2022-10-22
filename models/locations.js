const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema(
  {
    locationName: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 20,
      required: true,
      unique: true
    },
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String, enum: ["WA", "OR", "ID"], required: true },
    zip: { type: String, trim: true, match: /^\d{5}$/ },
    phone: { type: String, trim: true, match: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/ },
  },
  { collection: "locations", timestamps: true }
);

module.exports = mongoose.model("Locations", locationsSchema);
