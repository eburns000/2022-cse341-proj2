const router = require("express").Router();
const swagger = require("./swagger");
const authorizationRoutes = require("./authorization");
const patientsRoutes = require("./patients");
const locationsRoutes = require("./locations");
const therapistsRoutes = require("./therapists");
const libraryRoutes = require("./library");
const userInfoRoutes = require("./userInfo");
const openCors = require("../middleware/openCors");

router.use("/", swagger);
router.use("/patients", patientsRoutes);
router.use("/locations", locationsRoutes);
router.use("/therapists", therapistsRoutes);
router.use("/library", libraryRoutes);
router.use("/authorization", authorizationRoutes);
router.use("/userinfo", userInfoRoutes);
router.use(openCors);

module.exports = router;
