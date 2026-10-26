require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const User = require("./models/user.model")
const validateUser = require("./utils/userValidation")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser  = require('cookie-parser')

const authRouter = require("./routes/authRoute.route")
const userRouter = require("./routes/authRoute.route")
const commentRouter = require("./routes/comment.route")

const dns = require("node:dns");
const app = express();
const PORT = process.env.PORT || 5000;


dns.setServers(["1.1.1.1", "8.8.8.8"]);
app.use(express.json());
app.use(cookieParser());


// make code neat and clean
app.use("/auth", authRouter);
app.use("/user",userRouter);
app.use("/comment", commentRouter);



connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).
  catch((error) => {
    console.error("Server failed to start:", error);
  })
