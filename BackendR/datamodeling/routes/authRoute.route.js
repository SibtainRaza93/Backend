const express = require('express');
const User = require("./models/user.model")
const validateUser = require("./utils/userValidation")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {

  try {
    validateUser(req.body);
    // password convert into hash
    req.body.password = await bcrypt.hash(req.body.password, 10); 
    await User.create(req.body);
    res.send("user Registered");
  } catch (error) {
    console.log("Error",error.message )
  }

});

authRouter.post("/login", async (req, res) => {
  try {
    const people = await User.findOne({ emailId: req.body.emailId });

    if (!people) {
      throw new Error("Invalid credentials");
    }

    const isAllowed = await bcrypt.compare(
      req.body.password,
      people.password
    );

    if (!isAllowed) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { _id: people._id, emailId: people.emailId },
      "sdbjhsdjh"
    );

    res.cookie("token", token);

    res.send("Login Successfully");
  } catch (error) {
    console.log("Error", error.message);
    res.status(401).send(error.message);
  }
});

module.exports = authRouter;