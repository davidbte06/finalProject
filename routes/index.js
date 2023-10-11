const router = require('express').Router();
router.use('/', require('./swagger'));
router.use('/programs', require('./programs'));

// PASTE RIGHT HERE YOUR ROUTES
router.get('/', (req, res) => {
    res.send('tvshows  programs');
});



module.exports = router;