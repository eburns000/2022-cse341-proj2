const router = require('express').Router();
const swagger = require('./swagger');
const openCors = require('../middleware/openCors'); 

router.use('/', swagger);
router.use('/patients', require('./patients'));
router.use('/locations', require('./locations'));
router.use('/therapists', require('./therapists'));
router.use('/library', require('./library'));
router.use(openCors);

module.exports = router;
