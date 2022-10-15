const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');

router.get('/', locationsController.getLocations);

module.exports = router;