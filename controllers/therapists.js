const { ObjectID } = require("bson");
const Therapists = require("../models/therapists");

// Get Therapists
const getTherapists = async (req, res) => {
  // get all if no query parameter, or allow to query by discipline
  const query = req.query.discipline
    ? { discipline: req.query.discipline }
    : {};

  const sort = { discipline: 1, lastName: 1, firstName: 1 }; // sort by
  const projection = { _id: 1, lastName: 1, firstName: 1, credentials: 1 }; // only show fields

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
  const id = req.params.id; // findById casts id as a MongoDB ObjectID

  await Therapists.findById(id)
    .then((data) => {
      console.log(data);
      if (!data)
        res
          .status(404)
          .send({ message: `Therapist not found with id = ${id}` });
      else res.status(200).send(data);
    })
    .catch((err) => {
      console.log(`Error message: ${err.message}`);
      res.status(500).send({
        message: `Error retrieving Therapist with id = ${id}; not a valid MongoDB Object id`,
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
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const update = req.body;
  const options = { runValidators: true };

  await Therapists.findByIdAndUpdate(id, update, options)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Therapist with id=${id}. Therapist was not found!`,
        });
      } else
        res
          .status(204)
          .send({ message: "Therapist was updated successfully." });
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
            message: `Error retrieving Therapist with id = ${id}; not a valid Mongo Object id`,
          });
          break;
        default:
          res.status(500).send({
            message:
              err.message ||
              `Error updating Therapist in Library with id=${id}; Unknown server error`,
          });
      }

      console.log(`Error message: ${err.message}`);
      if (err.errors) console.log(`Error: ${err.name}`);
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
