
const User = require('../models/User');

// @desc    Get all users (by Admin)
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// @desc    Create a new user (by Admin)
// @route   POST /api/users
// @access  Private/Admin
exports.createUser = async (req, res) => {
  const { email, password, role, staffType } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUserPayload = {
      email,
      password,
      role: role || 'user',
    };

    if (newUserPayload.role === 'staff') {
      newUserPayload.staffType = staffType || 'general';
    }

    user = new User(newUserPayload);
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        staffType: user.staffType,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update a user's details (by Admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
    try {
        const { email, role, staffType } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ msg: 'This email is already in use by another account.' });
            }
            user.email = email;
        }

        if (user.id === req.user.id && user.role === 'admin' && role !== 'admin') {
            return res.status(400).json({ msg: 'Admins cannot change their own role.' });
        }

        user.role = role || user.role;
        user.staffType = role === 'staff' ? staffType || user.staffType : undefined;

        await user.save();
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a user (by Admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if (user.id === req.user.id) {
        return res.status(400).json({ msg: 'You cannot delete your own admin account' });
    }

    await user.deleteOne();

    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

