const express = require('express');
const router = express.Router();

const programsController = require('../controllers/programs');


router.get('/', programsController.getAllProgram);
router.get('/:id', programsController.getSingle);
router.post('/', programsController.postProgram);
router.put('/:id', programsController.putProgram);
router.delete('/:id', programsController.deleteProgram);

module.exports = router;