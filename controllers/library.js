const Library = require('../models/library');

// GET All from Exercise Library
const getLibrary = async (req, res) => {
  const library = await Library.find();
  res.status(200).json(library);
};

// GET Exercise by ID
const getExerciseById = async (req, res) => {
  const id = new ObjectID(req.params.id);
  await Library.find({ _id: id })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: 'Exercise not found with id = ' + id });
      else res.status(200).send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Exercise with id = ' + id,
      });
    });
};

// POST Exercise to Library
const postExerciseToLibrary = async (req, res) => {
  // Validate request
  if (!req.body.exerciseName || !req.body.instructions) {
    res.status(400).send({ message: 'Exercise name and instructions are both required!' });
    return;
  }

  // Creaet an exercise to add to the library
  const exercise = new Library({
    exerciseName: req.body.exerciseName,
    instructions: req.body.instructions
  });

  // save exercise to the library
  exercise
    .save(exercise)
    .then((data) => {
      res
        .status(201)
        .send(`New exercise added to library with the following id: ${data._id}`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Exercise.'
      });
    });
};

// PUT Exercise in Library (modify)
const putExerciseById = async (req, res) => {
  const id = new ObjectID(req.params.id);
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  await Library.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Exercise in library with id=${id}. Maybe Exercise was not found!`,
        });
      } else res.status(200).send({ message: 'Exercise in Library was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Exercise in Library with id=' + id,
      });
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
          message: 'Exercise in library was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete exercise in library with id=' + id,
      });
    });
};

module.exports = { getLibrary, postExerciseToLibrary, getExerciseById, putExerciseById, deleteExerciseById }