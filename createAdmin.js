// createAdmin.js (Corrected Version)
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminEmail = 'abc@gmail.com';
    const adminPassword = 'abc';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists. Please delete it first to recreate.');
      mongoose.connection.close();
      return;
    }

    // Create the admin user with the PLAIN password
    // The User model's pre-save hook will handle the hashing automatically
    const adminUser = new User({
      email: adminEmail,
      password: adminPassword, // <-- We now provide the plain password
      role: 'admin',
    });

    await adminUser.save();
    console.log('Super Admin created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword} (use this to log in)`);

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();