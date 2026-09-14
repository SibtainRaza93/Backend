const {nanoid} = require("nanoid")
const URL = require("../models/url.models")
async function handleGenerateUrl(req, res){
    const body = req.body;

    if(!body.url) return res.status(400).json({error: "Url is required"}) ;
    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })

    return res.json({ id: shortID})
}

async function handleGenerateNewId(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now()
        }
      }
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).json({
      error: "Short URL not found"
    });
  }

  return res.redirect(entry.redirectURL);
}


module.exports = {
    handleGenerateUrl,
    handleGenerateNewId
}