require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const User = require("./models/user.model")
const validateUser = require("./utils/userValidation")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser  = require('cookie-parser')

const dns = require("node:dns");
const app = express();
const PORT = process.env.PORT || 5000;


dns.setServers(["1.1.1.1", "8.8.8.8"]);
app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {

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

app.post("/login", async (req, res) => {
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
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error.message)
  }
});

app.get("/user", async (req, res) => {
  try {

    const payload = jwt.verify(req.cookies.token, "ansh@123" )
    const result = await User.findById(payload._id);

    res.send(result);
  } catch (error) {
    console.log("Error", error.message)
  }
})


app.delete("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted successfully");
  } catch (error) {
    res.send("Error", error.message)
  }
})

app.patch("/user/id", (req, res) => {

})
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).
  catch((error) => {
    console.error("Server failed to start:", error);
  })
