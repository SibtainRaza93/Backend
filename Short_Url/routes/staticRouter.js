const express = require("express")
const URL = require("../models/url.models")

const router = express.Router();

router.get("/test", async(req, res)=>{
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
    })
})

router.get('/signup', (req, res)=>{
    return res.render("signup")
})
router.get('/login', (req, res)=>{
    return res.render("login")
})

module.exports = router