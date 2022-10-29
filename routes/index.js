const router = require("express").Router();
const swagger = require("./swagger");
const authorizationRoutes = require("./authorization");
const openCors = require("../middleware/openCors");

router.use("/", swagger);
router.use("/patients", require("./patients"));
router.use("/locations", require("./locations"));
router.use("/therapists", require("./therapists"));
router.use("/library", require("./library"));
router.use("/authorization", authorizationRoutes);
router.use(openCors);

module.exports = router;
