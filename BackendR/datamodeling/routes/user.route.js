const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

// GET /user -> get all users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Failed to fetch users');
  }
});

// GET /user/profile -> get logged-in user
userRouter.get('/profile', async (req, res) => {
  try {
    const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    const user = await User.findById(payload._id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(401).send('Invalid or expired token');
  }
});

// PATCH /user/:id -> update user
userRouter.patch('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.send(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Failed to update user');
  }
});

// DELETE /user/:id -> delete user
userRouter.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    res.send('User deleted successfully');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Failed to delete user');
  }
});

module.exports = userRouter;