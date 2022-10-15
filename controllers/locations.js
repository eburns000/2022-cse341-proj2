const Locations = require('../models/locations');

// Get Locations
const getLocations = async (req, res) => {
  const locations = await Locations.find();
  res.status(200).json(locations);
}

module.exports = { getLocations }