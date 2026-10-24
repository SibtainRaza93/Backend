require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const User = require("./models/user.model")
const validateUser = require("./utils/userValidation")
const bcrypt = require('bcrypt');

const dns = require("node:dns");
const app = express();
const PORT = process.env.PORT || 5000;


dns.setServers(["1.1.1.1", "8.8.8.8"]);
app.use(express.json());

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

app.post("/login", async(req, res) =>{
  try{
    const people = User.findById(req.body._id);

    if(!(req.body.emailId == people.emailId)){
        throw Error("Invalide credentials")
    }
    const isAllowed = await bcrypt.compare(req.bosy.password, people.password);

    if(!isAllowed){
      throw Error("Invalide credentials")
    }

    res.send("Login Successfully")
  }
  catch(error){
    console.log("Error", error.message);
  }
})
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error.message)
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const result = await User.findById(req.params.id);

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
