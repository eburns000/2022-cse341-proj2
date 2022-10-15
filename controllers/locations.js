const Locations = require('../models/locations');

// Get Locations
const getLocations = async (req, res) => {
  const locations = await Locations.find();
  req.status(200).json(locations);
}

module.exports = { getLocations }