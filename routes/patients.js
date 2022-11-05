const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patients');
const loadUser = require("../middleware/loadUser");

// require user - middleware - let's load the user before we proceed
router.use([loadUser]);

router.get('/', patientsController.getPatients);
router.get('/:id', patientsController.getPatientById);
router.post('/', patientsController.postPatient);
router.put('/:id', patientsController.putPatientById);
router.delete('/:id', patientsController.deletePatientById);

module.exports = router;
