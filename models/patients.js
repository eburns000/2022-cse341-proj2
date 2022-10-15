const mongoose = require("mongoose");

const patientsSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    phone: { type: String },
    email: { type: String },
    assignedLocationID: { type: String },
    assignedTherapistID: { type: String },
    assignedExercises: [
      {
        libraryID: String,
        dateAssigned: String,
        dateEnded: String,
        completed: Boolean,
        note: String
      }
    ]
  },
  { collection: "patients" }
);

module.exports = mongoose.model("Patients", patientsSchema);
