const User = require('../models/User');
const { success, error } = require('../utils/response');

/**
 * @desc   Get a user profile by ID
 * @route  GET /api/users/:id
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    success(res, users);
  } catch (err) {
    error(res, 'Failed to fetch users');
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return error(res, 'User not found', 404);
    success(res, user);
  } catch (err) {
    error(res, 'Failed to fetch user');
  }
};

/**
 * @desc   Update a user profile
 * @route  PUT /api/users/:id
 */
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (!updates || Object.keys(updates).length === 0) {
      return error(res, 'No fields provided for update', 400);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedUser) return error(res, 'User not found', 404);

    success(res, updatedUser);
  } catch (err) {
    error(res, 'Failed to update user');
  }
};
