const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/library');

router.get('/', libraryController.getLibrary);
router.post('/', libraryController.addExerciseToLibrary);

module.exports = router;