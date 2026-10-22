require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const User = require("./models/user.model")

const dns = require("node:dns");
const app = express();
const PORT = process.env.PORT || 5000;


dns.setServers(["1.1.1.1", "8.8.8.8"]);
app.use(express.json());

app.post("/register", async (req, res) => {
  await User.create(req.body);
  res.send("user Registered");
});

app.get("/info", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error.message)
  }
});

app.get("/user/:id", async(req, res)=>{
    try {
      const result = await user.findById(req.params.id);

      res.send(result);
    } catch (error) {
      console.log("Error", error.message)
    }
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
