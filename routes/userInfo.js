const express = require('express');
const router = express.Router();
const userInfoController = require('../controllers/userInfo');
const loadUser = require("../middleware/loadUser");

// require user - middleware - let's load the user before we proceed
router.use([loadUser]);

// get user information
router.get('/', userInfoController.getUserInfo);

module.exports = router;