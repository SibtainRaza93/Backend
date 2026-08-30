const htpp= require("http")

const myServer = htpp.createServer((req, res) =>{
    console.log("Rec received");
    res.end("Server ")
})

myServer.listen(8000, () =>{
    console.log("Server started")
})