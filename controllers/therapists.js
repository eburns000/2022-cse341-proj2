const { ObjectID } = require("bson");
const Therapists = require("../models/therapists");

// Get Therapists
const getTherapists = async (req, res) => {
  // get all if no query parameter, or allow to query by discipline
  const query = req.query.discipline
    ? { discipline: req.query.discipline }
    : {};

  const sort = { discipline: 1, lastName: 1, firstName: 1 }; // sort by
  const projection = { _id: 0, lastName: 1, firstName: 1, credentials: 1 }; // only show fields

  await Therapists.find(query, projection)
    .sort(sort)
    .then((data) => {
      if (!data) res.status(404).send({ message: "No data returned" });
      else res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving therapist data from server",
      });
    });
};

// GET Therapist by ID
const getTherapistById = async (req, res) => {
  const id = new ObjectID(req.params.id);
  await Therapists.find({ _id: id })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Therapist not found with id = " + id });
      else res.status(200).send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving therapist with therapist id = " + id,
      });
    });
};

// POST Therapist
const postTherapist = async (req, res) => {
  // Creaet a new therapist
  const therapist = new Therapists({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    credentials: req.body.credentials,
    discipline: req.body.discipline,
  });

  // save exercise to the library
  await therapist
    .save(therapist)
    .then((data) => {
      res
        .status(201)
        .send(`New therapist added with the following id: ${data._id}`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the therapist.",
      });
    });
};

// PUT Therapist (modify)
const putTherapistById = async (req, res) => {
  const id = new ObjectID(req.params.id);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const update = req.body;
  const options = { runValidators: true };
  
  await Therapists.updateOne({ _id: id }, update, options)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Therapist with id=${id}. Maybe Therapist was not found!`,
        });
      } else
        res
          .status(204)
          .send({ message: "Therapist was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Therapist with id=" + id,
      });
    });
};

// DELETE therapist
const deleteTherapistById = async (req, res) => {
  const id = new ObjectID(req.params.id);

  await Therapists.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Therapist with id=${id}. Maybe Therapist was not found!`,
        });
      } else {
        res.status(200).send({
          message: "Therapist was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Therapist with id=" + id,
      });
    });
};

module.exports = {
  getTherapists,
  getTherapistById,
  postTherapist,
  putTherapistById,
  deleteTherapistById,
};
