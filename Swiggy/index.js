const express = require('express');
const {Auth} = require("./middleware/Auth")


const app = express();

app.use(express.json())
const productMenu = [
  {
    id: 1,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with spicy chicken",
    price: 249,
    category: "Biryani",
    rating: 4.5,
    isVeg: false,
    isAvailable: true
  },
  {
    id: 2,
    name: "Paneer Butter Masala",
    description: "Paneer cubes cooked in creamy tomato gravy",
    price: 199,
    category: "North Indian",
    rating: 4.3,
    isVeg: true,
    isAvailable: true
  },
  {
    id: 3,
    name: "Veg Fried Rice",
    description: "Fried rice tossed with fresh vegetables",
    price: 149,
    category: "Chinese",
    rating: 4.1,
    isVeg: true,
    isAvailable: true
  },
  {
    id: 4,
    name: "Chicken Burger",
    description: "Crispy chicken patty with lettuce and mayonnaise",
    price: 179,
    category: "Burgers",
    rating: 4.4,
    isVeg: false,
    isAvailable: true
  },
  {
    id: 5,
    name: "Margherita Pizza",
    description: "Classic pizza topped with mozzarella cheese",
    price: 199,
    category: "Pizza",
    rating: 4.2,
    isVeg: true,
    isAvailable: true
  },
  {
    id: 6,
    name: "French Fries",
    description: "Crispy golden potato fries",
    price: 99,
    category: "Snacks",
    rating: 4.0,
    isVeg: true,
    isAvailable: true
  },
  {
    id: 7,
    name: "Chicken Momos",
    description: "Steamed dumplings filled with seasoned chicken",
    price: 129,
    category: "Chinese",
    rating: 4.3,
    isVeg: false,
    isAvailable: true
  },
  {
    id: 8,
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie",
    price: 89,
    category: "Desserts",
    rating: 4.6,
    isVeg: true,
    isAvailable: true
  }
];

//Routes
// Handle the error like middle ware
app.use("/admin", Auth)
app.get("/food", (req, res) =>{
    res.send(productMenu);
})

app.post("/admin", (req, res)=>{
    // // ADD Items 
    // //Authentication karna padega 
    // const token = "ABCDEF";
    // const Access = token == "ABCDEF"?1:0;
    productMenu.push(req.body);
    res.send("Items Added successfuly");
   


})

app.delete("/admin/:id", (req, res) =>{
    // const token = "ABCDEF";
    // const Access = token == "ABCDEF"?1:0;
        const id = parseInt(req.params.id)

        const index = productMenu.findIndex(item => item.id ===id);

        if(index ==-1){
            res.send("Item does not exist")
        }else{
            productMenu.splice(index, 1);
            res.send("Item has successfully deleted ")
        }
})

app.patch("/admin/:id", (req, res) => {
    // const token = "ABCDEF";
    // const access = token === "ABCDEF" ? 1 : 0;
    const id = parseInt(req.params.id);

    const foodata = productMenu.find(item => item.id === id);

    if (!foodata) {
        return res.status(404).send("Food does not exist");
    }

    if (req.body.name) {
        foodata.name = req.body.name;
    }

    if (req.body.price) {
        foodata.price = req.body.price;
    }

    res.send(foodata);
});
app.listen(4000, ()=>{
    console.log("Listening at PORT: 4000");
})