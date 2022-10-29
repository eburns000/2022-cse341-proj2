const express = require('express');
const router = express.Router();
const therapistsController = require('../controllers/therapists');
// could instead do:
// import { getTherapists, postTherapist, ...} from "../controllers/therapists";
const loadUser = require("../middleware/loadUser");


// require user - middleware - let's load the user before we proceed
router.use([loadUser]);

// added for testing purposes
// get user information
router.get('/userinfo', therapistsController.getUserInfo);
// all other normal routes
router.get('/', therapistsController.getTherapists);
router.get('/:id', therapistsController.getTherapistById);
router.post('/', therapistsController.postTherapist);
router.put('/:id', therapistsController.putTherapistById);
router.delete('/:id', therapistsController.deleteTherapistById);

module.exports = router;