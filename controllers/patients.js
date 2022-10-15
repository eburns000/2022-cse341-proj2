const Patients = require('../models/patients');

// Get Patients
const getPatients = async (req, res) => {
  const patients = await Patients.find();
  req.status(200).json(patients);
}

module.exports = { getPatients }