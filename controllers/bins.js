const Bin = require('../models/bin.js');
const Request = require('../models/request.js');

const express = require('express');
const router = express.Router();

// get all bins
router.get("/", async (request, response) => {
  try {
    const bins = await Bin.all();
    response.status(200).json(bins);
  } catch (error) {
    response.status(500).send(error);
  }
});

// create new bin
router.post("/", async (request, response) => {
  // without name will create with default name
  try {
    const newBin = await Bin.createNew();
    response.status(200).json(newBin);
  } catch (error) {
    response.status(500).send(error)
  }
});

// delete bin - need bin_id not unique string
router.delete("/:id", async (request, response) => {
  const binId = request.params.id
  try {
    await Bin.deleteBin(binId)
    await Request.deleteAllByBin(binId)
    response.status(204).send()
  } catch (error) {
    console.log(error)
    response.status(500).send(error)
  }
})

module.exports = router;