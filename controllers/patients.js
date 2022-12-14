const { ObjectID } = require("bson");
const Patients = require("../models/patients");

// GET all patients
const getPatients = async (req, res) => {
  await Patients.find()
    .then((data) => {
      if (!data) res.status(404).send({ message: "No data returned" });
      else res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving patient data from server",
      });
    });
};

// GET Patient by ID
const getPatientById = async (req, res) => {
  const id = req.params.id; // findById casts id as a MongoDB ObjectID

  await Patients.findById(id)
    .then((data) => {
      console.log(data);
      if (!data)
        res.status(404).send({ message: `Patient not found with id = ${id}` });
      else res.status(200).send(data);
    })
    .catch((err) => {
      console.log(`Error message: ${err.message}`);
      res.status(500).send({
        message: `Error retrieving Patient with id = ${id}; not a valid MongoDB Object id`,
      });
    });
};

// POST Patient
const postPatient = async (req, res) => {
  // Creaet a new patient
  const patient = new Patients({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    email: req.body.email,
    assignedLocationID: req.body.assignedLocationID,
    assignedTherapistID: req.body.assignedTherapistID,
    assignedExercises: req.body.assignedExercises,
  });

  // save exercise to the library
  await patient
    .save(patient)
    .then((data) => {
      res
        .status(201)
        .send(`New patient added with the following id: ${data._id}`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the patient.",
      });
    });
};

// PUT Patient (modify)
const putPatientById = async (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const update = req.body;
  const options = { runValidators: true };
  
  await Patients.findByIdAndUpdate(id, update, options)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Patient with id=${id}. Patient was not found!`,
        });
      } else
        res
          .status(204)
          .send({ message: "Patient was updated successfully." });
    })
    .catch((err) => {
      switch (err.name) {
        case "ValidationError":
          res.status(422).send({
            message:
              err.message ||
              `Validation failed; check data entered and try again.`,
          });
          break;
        case "CastError":
          res.status(404).send({
            message: `Error retrieving Patient with id = ${id}; not a valid Mongo Object id`,
          });
          break;
        default:
          res.status(500).send({
            message:
              err.message ||
              `Error updating Patient with id=${id}; Unknown server error`,
          });
      }

      console.log(`Error message: ${err.message}`);
      if (err.errors) console.log(`Error: ${err.name}`);
    });
};

// DELETE Patient
const deletePatientById = async (req, res) => {
  const id = new ObjectID(req.params.id);

  await Patients.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`,
        });
      } else {
        res.status(200).send({
          message: "Patient was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Patient with id=" + id,
      });
    });
};

module.exports = {
  getPatients,
  getPatientById,
  postPatient,
  putPatientById,
  deletePatientById,
};
