const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req, res) => { res. send('Welcome');});

// PASTE RIGHT HERE YOUR ROUTES

router.use('/reviews', require('./reviews'));

module.exports = router;