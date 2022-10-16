const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patients');

router.get('/', patientsController.getPatients);
router.get('/:id', patientsController.getPatientById);
router.post('/', patientsController.postPatient);
router.put('/:id', patientsController.putPatientById);
router.delete('/:id', patientsController.deletePatientById);

module.exports = router;
