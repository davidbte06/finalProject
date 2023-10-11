const router = require('express').Router();
router.use('/', require('./swagger'));
const UserController = require('../controllers/users');

router.get('/', (req, res) => { res. send('Welcome');});

// PASTE RIGHT HERE YOUR ROUTES

router.use('/reviews', require('./reviews'));

//USER ROUTES
// GET all users
router.get('/', UserController.getAllUsers);

// GET a single user by ID
router.get('/:id', UserController.getUserById);

// POST a new user
router.post('/', UserController.createUser);

// PUT update a user
router.put('/:id', UserController.updateUser);

// DELETE a user
router.delete('/:id', UserController.deleteUser);


module.exports = router;