const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patients');

router.get('/', patientsController.getPatients);

module.exports = router;

//Example
// const express = require('express');
// const router = express.Router();

// const contactsController = require('../controllers/contactsController');

// router.get('/', contactsController.getAll);
// router.get('/:id', contactsController.getSingle);
// router.post('/', contactsController.postSingle);
// router.delete('/:id', contactsController.deleteSingle);
// router.put('/:id', contactsController.putSingle);

// module.exports = router;