const express = require('express');

const commentRouter = express.Router();

// GET /comment
commentRouter.get('/', (req, res) => {
  res.send('Get user comments');
});

// PATCH /comment
commentRouter.patch('/', (req, res) => {
  res.send('Update user comment');
});

// DELETE /comment
commentRouter.delete('/', (req, res) => {
  res.send('Delete user comment');
});

module.exports = commentRouter;