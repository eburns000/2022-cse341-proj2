const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String, enum: ["WA", "OR", "ID"], required: true },
    zip: { type: String, trim: true, match: /^\d{5}$/ },
    phone: {
      type: String,
      trim: true,
      match: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    },
    assignedLocationID: { type: String },
    assignedTherapistID: { type: String },
    assignedExercises: [
      {
        libraryID: { type: String, required: true },
        dateAssigned: {
          type: String,
          match:
            /^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([2]{1}\d{3}))$/,
          required: true,
        },
        dateEnded: {
          type: String,
          match:
            /^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([2]{1}\d{3}))$/,
        },
        completed: { type: Boolean },
        note: { type: String },
      },
    ],
  },
  { collection: "patients", timestamps: true }
);

module.exports = mongoose.model("Patients", patientsSchema);
