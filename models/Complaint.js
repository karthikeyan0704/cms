

// const mongoose = require('mongoose');

// const ComplaintSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   programme: {
//     type: String,
//     trim: true,
//   },
//   department: {
//     type: String,
//     enum: ['scs', 'soc'],
//   },
//   // --- NEW FIELDS ---
//   roomNo: {
//     type: String,
//     trim: true,
//   },
//   complaintType: {
//     type: String,
//     enum: ['technical', 'maintenance', 'other'], // e.g., IT vs. Plumbing
//   },
//   // ------------------
//   status: {
//     type: String,
//     enum: ['Pending', 'In Progress', 'Work Completed', 'Resolved'],
//     default: 'Pending',
//   },
//   assignedTo: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     default: null
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('Complaint', ComplaintSchema);
const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  userName: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  programme: {
    type: String,
    trim: true,
  },
  department: {
    type: String,
    enum: ['scs', 'soc'],
  },
  roomNo: {
    type: String,
    trim: true,
  },
  complaintType: {
    type: String,
    enum: ['technical', 'maintenance', 'other'],
  },
  // --- NEW FIELDS ---
  regNo: {
    type: String,
    trim: true,
  },
  // In our simulation, this will store the local URI of the image
  complaintImage: {
      type: String,
  },
  // ------------------
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Work Completed', 'Resolved'],
    default: 'Pending',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);

