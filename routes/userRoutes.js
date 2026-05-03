const express = require('express');
const router = express.Router();

// 1. Make sure to import the new 'updateUser' function from your controller
const { createUser, getAllUsers, deleteUser, updateUser } = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Route to get a list of all users
router.get('/', protect, isAdmin, getAllUsers);

// Route to create a new user
router.post('/', protect, isAdmin, createUser);

// --- 2. THIS IS THE NEW ROUTE ---
// This tells the server to call the 'updateUser' function when it
// receives a PUT request to a URL like /api/users/some_user_id
router.put('/:id', protect, isAdmin, updateUser);

// Route to delete a user
router.delete('/:id', protect, isAdmin, deleteUser);


module.exports = router;



