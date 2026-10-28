const express = require('express');
const User = require('../models/user.model');
const validateUser = require('../utils/userValidation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

// POST /auth/register
authRouter.post('/register', async (req, res) => {
  try {
    validateUser(req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(400).send(error.message);
  }
});

// POST /auth/login
authRouter.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign(
      {
        _id: user._id,
        emailId: user.emailId,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token);

    res.send('Login successful');
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).send(error.message);
  }
});

authRouter.post("/logout", (req,res)=>{
    try{
      res.cookie("token", null,{expires: new Date.now()});
      res.send("logout successfully!");
    }
    catch(error){
      res.send("Error", error.message)
    }
})

module.exports = authRouter;