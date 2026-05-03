

const express = require('express');
const router = express.Router();

// Ensure all controller functions are imported correctly
const {
  createComplaint,
  getAllComplaints,
  updateComplaintStatus,
  getMyComplaints,
  deleteComplaint,
  assignComplaint,
  getAssignedComplaints,
} = require('../controllers/complaintController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

// Define all the routes, ensuring the second argument is a valid function

// Routes for regular users
router.post('/', protect, createComplaint);
router.get('/mycomplaints', protect, getMyComplaints);

// Route for staff to get their assigned tasks
router.get('/assignedtome', protect, getAssignedComplaints);

// This route can be used by both admin and staff
router.put('/:id/status', protect, updateComplaintStatus);

// Admin-only routes
router.get('/', protect, isAdmin, getAllComplaints);
router.delete('/:id', protect, isAdmin, deleteComplaint);
router.put('/:id/assign', protect, isAdmin, assignComplaint);

module.exports = router;
