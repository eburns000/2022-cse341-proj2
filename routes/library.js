const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/library');
const loadUser = require("../middleware/loadUser");

// require user - middleware - let's load the user before we proceed
router.use([loadUser]);

router.get('/', libraryController.getLibrary);
router.get('/:id', libraryController.getExerciseById);
router.post('/', libraryController.postExerciseToLibrary);
router.put('/:id', libraryController.putExerciseById);
router.delete('/:id', libraryController.deleteExerciseById);

module.exports = router;