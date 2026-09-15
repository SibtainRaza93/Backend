const express = require("express");
const path = require("path");
const URL = require("./models/url.models")
const {connectDB}  = require("./config/db")
const urlRoute = require("./routes/url.route");


const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json())

app.get("/test", async(req, res)=>{
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
    })
})

connectDB("mongodb://localhost:27017/short-url");
app.use("/url", urlRoute);


app.listen(PORT, () =>{
    console.log(`Server Started at PORT: ${PORT}`);
})