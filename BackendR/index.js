const express = require('express');

const app = express();

// app.use("/about", (req, res) => {
//     res.send("I am about page");
// })

// app.get("/user", (req, res) => {
//     // console.log(req);
//     res.send({ name: "Raza", age: 20 });
// })

//Book Store make 

const products = [
    { id: 1, name: "Laptop", price: 60000, category: "electronics", stock: 10 },
    { id: 2, name: "Mouse", price: 800, category: "accessories", stock: 25 },
    { id: 3, name: "Keyboard", price: 1500, category: "accessories", stock: 15 },
    { id: 4, name: "Monitor", price: 12000, category: "electronics", stock: 5 },
    { id: 5, name: "Headphones", price: 2500, category: "audio", stock: 0 }
];

app.get("/book", (req, res) => {
    res.send(products);
})


//GET 
app.get("/book/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(info => info.id == id);
    console.log(product);
})


//DELETE
app.delete("/book/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(info => info.id == id);

    if (index == -1) {
        return res.status(404).send("Product not found");
    }
    const deleted = products.splice(index, 1);

    console.log(deleted)

    res.send("Product deleted successfully");
})


//PATCH
app.patch("/book", (req, res)=>{


    res.send("Patch has been done");
})
app.listen(4000, () => {
    console.log("Listening at port:4000")
})