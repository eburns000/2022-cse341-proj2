const Library = require('../models/library');

// Get Exercise Library
const getLibrary = async (req, res) => {
  const library = await Library.find();
  res.status(200).json(library);
};

// Add Exercise to Library
const addExerciseToLibrary = async (req, res) => {
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
        .send(`New exercise added to library with the following id: ${data.insertedId}`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Exercise.'
      });
    });
};

module.exports = { getLibrary, addExerciseToLibrary }