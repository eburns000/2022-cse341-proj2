const express = require('express');
const router = express.Router();
const therapistsController = require('../controllers/therapists');
// could instead do:
// import { getTherapists, postTherapist, ...} from "../controllers/therapists";
const loadUser = require("../middleware/loadUser");


// require user
router.use([loadUser]);

router.get('/', therapistsController.getTherapists);
router.get('/:id', therapistsController.getTherapistById);
router.post('/', therapistsController.postTherapist);
router.put('/:id', therapistsController.putTherapistById);
router.delete('/:id', therapistsController.deleteTherapistById);

module.exports = router;