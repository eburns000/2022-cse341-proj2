const Therapists = require('../models/therapists');

// Get Therapists
const getTherapists = async (req, res) => {
  const therapists = await Therapists.find();
  res.status(200).json(therapists);
}

module.exports = { getTherapists }