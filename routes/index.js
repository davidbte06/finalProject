const router = require('express').Router();
router.use('/', require('./swagger'));

// PASTE RIGHT HERE YOUR ROUTES
router.get('/', (req, res) => {
    res.send('tvshows  programs');
});


router.use('/reviews', require('./reviews'));

module.exports = router;