const express = require('express');
const users = require("./MOCK_DATA.json");

const app =express();

const PORT = 8000

//Routes

app.get("/users", (req, res) =>{
    const http = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`)}
    </ul>
    `;

    res.send(http)
})
app.get("/api/users", (req, res) =>{
    return res.json(users)
})




app.listen(PORT, ()=>{
    console.log("Server started:", PORT);
    
})