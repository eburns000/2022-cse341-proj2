const Library = require('../models/library');

// Get Exercise library
const getLibrary = async (req, res) => {
  const library = await Library.find();
  req.status(200).json(library);
}

module.exports = { getLibrary }