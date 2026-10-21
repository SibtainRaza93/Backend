require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const User = require("./models/user.model")

const dns =  require("node:dns");
const app = express();
const PORT = process.env.PORT || 5000;


dns.setServers(["1.1.1.1", "8.8.8.8"]);
app.use(express.json());

app.get("/info", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.post("/register", async (req, res) => {
  await User.create(req.body);
  res.send("user Registered");
});


connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).
catch((error)=>{
    console.error("Server failed to start:", error);
})
