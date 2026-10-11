const express = require('express');

const app = express();

app.use("/about", (req, res)=>{
    res.send("I am about page");
})

app.get("/user", (req, res)=>{
    // console.log(req);
    res.send({name:"Raza", age:20});
})

app.listen(4000, ()=>{
    console.log("Listening at port:4000")
})