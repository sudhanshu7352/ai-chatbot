const router = require("express").Router();
const axios = require("axios");
const Ticket = require("../models/Ticket");

router.post("/message", async (req, res) => {
  const aiRes = await axios.post("http://localhost:8000/predict", {
    message: req.body.message
  });

  if (aiRes.data.response.includes("Ticket")) {
    await Ticket.create({ query: req.body.message });
  }

  res.json(aiRes.data);
});

module.exports = router;