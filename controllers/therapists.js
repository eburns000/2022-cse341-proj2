const { ObjectID } = require('bson');
const Therapists = require('../models/therapists');

// Get Therapists
const getTherapists = async (req, res) => {
  const therapists = await Therapists.find();
  res.status(200).json(therapists);
};

// GET Therapist by ID
const getTherapistById = async (req, res) => {
  const id = new ObjectID(req.params.id);
  await Therapists.find({ _id: id })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: 'Therapist not found with id = ' + id });
      else res.status(200).send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving therapist with therapist id = ' + id,
      });
    });
};

// POST Therapist
const postTherapist = async (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.lastName || !req.body.credentials || !req.body.discipline) {
    res.status(400).send({ message: 'name (first and last), credentials and discipline required!' });
    return;
  }

  // Creaet a new therapist
  const therapist = new Therapists({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    credentials: req.body.credentials,
    discipline: req.body.discipline
  });

  // save exercise to the library
  therapist
    .save(therapist)
    .then((data) => {
      res
        .status(201)
        .send(`New therapist added with the following id: ${data._id}`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the therapist.'
      });
    });
};

// PUT Therapist (modify)
const putTherapistById = async (req, res) => {
  const id = new ObjectID(req.params.id);
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  await Therapists.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Therapist with id=${id}. Maybe Therapist was not found!`,
        });
      } else res.status(200).send({ message: 'Therapist was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Therapist with id=' + id,
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
          message: 'Therapist was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Therapist with id=' + id,
      });
    });
};

module.exports = { getTherapists, getTherapistById, postTherapist, putTherapistById, deleteTherapistById }