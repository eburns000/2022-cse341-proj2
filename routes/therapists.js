const express = require('express');
const router = express.Router();
const therapistsController = require('../controllers/therapists');

router.get('/', therapistsController.getTherapists);

module.exports = router;