const express = require("express");
const {connectDB}  = require("./config/db")
const urlRoute = require("./routes/url.route");

const app = express();
const PORT = 8001;

app.use(express.json())

connectDB("mongodb://localhost:27017/short-url");
app.use("/url", urlRoute);


app.listen(PORT, () =>{
    console.log(`Server Started at PORT: ${PORT}`);
})