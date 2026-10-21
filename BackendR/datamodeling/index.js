require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const dns =  require("node:dns");
const app = express();
const PORT = process.env.PORT || 5000;


dns.setServers(["1.1.1.1", "8.8.8.8"]);
app.use(express.json());

app.get("/", (req, res)=>{
    res.setEncoding("API is runnig");
})


connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).
catch((error)=>{
    console.error("Server failed to start:", error);
})
