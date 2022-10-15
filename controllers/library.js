const Library = require('../models/library');

// Get Exercise library
const getLibrary = async (req, res) => {
  const library = await Library.find();
  res.status(200).json(library);
}

module.exports = { getLibrary }