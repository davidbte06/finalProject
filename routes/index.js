const router = require('express').Router();
router.use('/', require('./swagger'));

// PASTE RIGHT HERE YOUR ROUTES

router.use('/movies', require('./movies'));

//router.use('/reviews', require('./reviews'));

module.exports = router;