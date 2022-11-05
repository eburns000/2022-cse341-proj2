const { ObjectID } = require("bson");
const Library = require("../models/library");

// GET All from Exercise Library
const getLibrary = async (req, res) => {
  await Library.find()
    .then((data) => {
      if (!data) res.status(404).send({ message: "No data returned" });
      else res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving exercise library data from server",
      });
    });
};

// GET Exercise by ID
const getExerciseById = async (req, res) => {
  const id = req.params.id; // findById casts id as a MongoDB ObjectID

  await Library.findById(id)
    .then((data) => {
      console.log(data);
      if (!data)
        res.status(404).send({ message: `Exercise not found with id = ${id}` });
      else res.status(200).send(data);
    })
    .catch((err) => {
      console.log(`Error message: ${err.message}`);
      res.status(500).send({
        message: `Error retrieving Exercise with id = ${id}; not a valid MongoDB Object id`,
      });
    });
};

// POST Exercise to Library
const postExerciseToLibrary = async (req, res) => {
  // Create an exercise to add to the library
  const exercise = new Library({
    exerciseName: req.body.exerciseName,
    instructions: req.body.instructions,
  });

  // save exercise to the library
  await exercise
    .save(exercise)
    .then((data) => {
      res
        .status(201)
        .send(
          `New exercise added to library with the following id: ${data._id}`
        );
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Exercise.",
      });
    });
};

// PUT Exercise in Library (modify)
const putExerciseById = async (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const update = req.body;
  const options = { runValidators: true };
  // for findByIdAndUpdate, id can be object, number, or string - if string, method casts it to an object
  await Library.findByIdAndUpdate(id, update, options)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Exercise in library with id=${id}. Exercise was not found!`,
        });
      } else
        res
          .status(204)
          .send({ message: "Exercise in Library was updated successfully." });
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
            message: `Error retrieving Exercise with id = ${id}; not a valid Mongo Object id`,
          });
          break;
        default:
          res.status(500).send({
            message:
              err.message ||
              `Error updating Exercise in Library with id=${id}; Unknown server error`,
          });
      }

      console.log(`Error message: ${err.message}`); // CHANGED - added
      if (err.errors) console.log(`Error: ${err.name}`); // CHANGED - added
    });
};

// DELETE exercise in library
const deleteExerciseById = async (req, res) => {
  const id = new ObjectID(req.params.id);

  await Library.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete exercise in Library with id=${id}. Maybe exercise was not found!`,
        });
      } else {
        res.status(200).send({
          message: "Exercise in library was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete exercise in library with id=" + id,
      });
    });
};

module.exports = {
  getLibrary,
  postExerciseToLibrary,
  getExerciseById,
  putExerciseById,
  deleteExerciseById,
};
