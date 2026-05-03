// controllers/statsController.js
const User = require('../models/User');
const Complaint = require('../models/Complaint');

// @desc    Get dashboard statistics
// @route   GET /api/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const complaintCount = await Complaint.countDocuments();

    res.json({
      users: userCount,
      complaints: complaintCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};