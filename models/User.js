// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user',
//   },
// }, { timestamps: true });

// // Middleware to hash password before saving
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'staff'],
    default: 'user',
  },
  // --- UPDATED ---
  // Add all the specific staff types to the enum list
  staffType: {
    type: String,
    enum: [
      'general',
      'lab_technician',
      'it_technician',
      'electrician',
      'plumber',
      'carpenter',
      'mechanic',
      'gardener'
    ],
   
  }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);

