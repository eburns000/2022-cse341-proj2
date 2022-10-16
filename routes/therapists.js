const express = require('express');
const router = express.Router();
const therapistsController = require('../controllers/therapists');

router.get('/', therapistsController.getTherapists);
router.get('/:id', therapistsController.getTherapistById);
router.post('/', therapistsController.postTherapist);
router.put('/:id', therapistsController.putTherapistById);
router.delete('/:id', therapistsController.deleteTherapistById);

module.exports = router;