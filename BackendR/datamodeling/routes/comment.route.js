const express = require('express');

const commentRouter = express.Router();


commentRouter.get("/", (req, res)=>{
    res.send("get usesrs comments");
})
commentRouter.patch("/", (req, res)=>{
    res.send("update usesrs comments");
})
commentRouter.delete("/", (req, res)=>{
    res.send("delete usesrs comments");
})


module.exports = commentRouter;