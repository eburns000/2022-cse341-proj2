const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');
// const { route } = require('./library'); // this should not be needed
const loadUser = require("../middleware/loadUser");

// require user - middleware - let's load the user before we proceed
router.use([loadUser]);

router.get('/', locationsController.getLocations);
router.get('/:id', locationsController.getLocationById);
router.post('/', locationsController.postLocation);
router.put('/:id', locationsController.putLocationById);
router.delete('/:id', locationsController.deleteLocationById);

module.exports = router;