const express = require("express")
const {handleGenerateUrl, handleGenerateNewId} = require("../controller/url.controller")

const router = express.Router();

router.post('/', handleGenerateUrl)

router.get('/:shortId', handleGenerateNewId)

module.exports = router;