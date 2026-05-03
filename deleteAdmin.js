// deleteAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const deleteAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const adminEmail = 'admin@example.com';
        const result = await User.deleteOne({ email: adminEmail });

        if (result.deletedCount > 0) {
            console.log(`Successfully deleted admin user: ${adminEmail}`);
        } else {
            console.log('Admin user not found.');
        }
    } catch (error) {
        console.error('Error deleting admin user:', error);
    } finally {
        mongoose.connection.close();
    }
};

deleteAdmin();