const express = require('express');
const User = require("./models/user.model")
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error.message)
  }
});

userRouter.get("/", async (req, res) => {
  try {

    const payload = jwt.verify(req.cookies.token, "ansh@123" )
    const result = await User.findById(payload._id);

    res.send(result);
  } catch (error) {
    console.log("Error", error.message)
  }
})


userRouter.delete("/", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted successfully");
  } catch (error) {
    res.send("Error", error.message)
  }
})

app.patch("/user/id", (req, res) => {

})

module.exports = userRouter;