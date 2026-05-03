


const Complaint = require('../models/Complaint');

// ... (keep all your other existing functions like getAllComplaints, getMyComplaints, etc.)

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Private
exports.createComplaint = async (req, res) => {
  // 1. Destructure all the new fields from the request body
  const { title, description, programme, department, roomNo, complaintType, regNo, complaintImage, userName } = req.body;

  try {
    // 2. Create a new complaint instance including all the new data
    const newComplaint = new Complaint({
      userName,
      title,
      description,
      programme,
      department,
      roomNo,
      complaintType,
      regNo,          // Add the registration number
      complaintImage, // Add the image URI
      user: req.user.id,
    });

    // 3. Save the complete complaint object to the database
    const complaint = await newComplaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// --- Keep all other functions in this file ---

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user', 'email').populate('assignedTo', 'email');
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateComplaintStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) { return res.status(404).json({ message: 'Complaint not found' }); }
    complaint.status = status;
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) { return res.status(404).json({ msg: 'Complaint not found' }); }
    await complaint.deleteOne();
    res.json({ msg: 'Complaint removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.assignComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) { return res.status(404).json({ msg: 'Complaint not found' }); }
    complaint.assignedTo = req.body.staffId;
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAssignedComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ assignedTo: req.user.id }).populate('user', 'email');
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


