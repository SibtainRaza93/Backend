const express = require('express')

const app = express();

const port = 8000

app.get("/", (req, res) =>{
    res.send("Hello from home page")
})
app.get("/about", (req, res) =>{
    res.send("Hello from about page")
})


app.listen(port, () =>{
    console.log("Server Started")
})







// const htpp= require("http")

// const myServer = htpp.createServer((req, res) =>{
//     console.log("Rec received");
//     res.end("Server ")
// })

// myServer.listen(8000, () =>{
//     console.log("Server started")
// })

