const { ObjectID } = require("bson");
const Locations = require("../models/locations");

// GET all Locations
const getLocations = async (req, res) => {
  await Locations.find()
    .then((data) => {
      if (!data) res.status(404).send({ message: "No data returned" });
      else res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving location data from server",
      });
    });
};

// GET Location by ID
const getLocationById = async (req, res) => {
  const id = new ObjectID(req.params.id);
  await Locations.find({ _id: id })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Location not found with id = " + id });
      else res.status(200).send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving location with location id = " + id,
      });
    });
};

// POST Location
const postLocation = async (req, res) => {
  // Creaet a new location
  const location = new Locations({
    locationName: req.body.locationName,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
  });

  // save exercise to the library
  await location
    .save(location)
    .then((data) => {
      res
        .status(201)
        .send(`New location added with the following id: ${data._id}`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the location.",
      });
    });
};

// PUT Location (modify)
const putLocationById = async (req, res) => {
  const id = new ObjectID(req.params.id);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const update = req.body;
  const options = { runValidators: true };

  await Locations.updateOne({ _id: id }, update, options)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Location with id=${id}. Maybe Location was not found!`,
        });
      } else
        res.status(204).send({ message: "Location was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Location with id=" + id,
      });
    });
};

// DELETE location
const deleteLocationById = async (req, res) => {
  const id = new ObjectID(req.params.id);

  await Locations.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Location with id=${id}. Maybe Location was not found!`,
        });
      } else {
        res.status(200).send({
          message: "Location was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Location with id=" + id,
      });
    });
};

module.exports = {
  getLocations,
  getLocationById,
  postLocation,
  putLocationById,
  deleteLocationById,
};
