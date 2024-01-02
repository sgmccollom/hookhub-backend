// using mergeParms to keep values of req.params from parent router
const requestRouter = require('express').Router({ mergeParams: true });
const request = require('../models/request');
const bin = require('../models/bin');

// get list of requests made to a specific bin
requestRouter.get('/', async (req, res) => {
  const bin_str = req.params.unique_string;
  let valid = await bin.validStr(bin_str);
  if (valid) {
    try {
      const requestList = await request.getRequestsByBin(bin_str)
      res.json(requestList)
    } catch (err) {
      console.error(err)
    }
  } else {
    res.status(404).send()
  }
})

// get specific request info/log data
requestRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const reqObj = await request.getRequestByRequestID(req.params.id)
    res.json(reqObj)
  } catch (err) {
    console.error(err)
    res.status(404).send()
  }
})

module.exports = requestRouter