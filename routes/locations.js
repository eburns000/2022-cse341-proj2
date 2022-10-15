const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');
const { route } = require('./library');

router.get('/', locationsController.getLocations);
router.get('/:id', locationsController.getLocationById);
router.post('/', locationsController.postLocation);
router.put('/:id', locationsController.putLocationById);
router.delete('/:id', locationsController.deleteLocationById);

module.exports = router;