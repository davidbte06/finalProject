const express = require('express');
const router = express.Router();

const tvshowsController = require('../controllers/tvshows');


router.get('/', tvshowsController.getAllTvshows);
router.get('/:id', tvshowsController.getSingleTvshows);
router.post('/', tvshowsController.postTvshows);
router.put('/:id', tvshowsController.putTvshows);
router.delete('/:id', tvshowsController.deleteTvshows);

module.exports = router;