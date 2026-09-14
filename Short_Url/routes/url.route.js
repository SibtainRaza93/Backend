const express = require("express")
const {handleGenerateUrl} = require("../controller/url.controller")

const router = express.Router();

router.post('/', handleGenerateUrl)

module.exports = router;