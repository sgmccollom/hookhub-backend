const { addRequest } = require("../models/request");
const gatherRouter = require("express").Router();
const bodyParser = require("body-parser");
gatherRouter.use(bodyParser.raw({ type: "*/*" }));

// gather all requests made to endpoint and send to PG and Monog DBs
// using unique_string
gatherRouter.all("/:unique_string", async (req, res) => {
  const head = req.headers;

  let body;
  if (Object.keys(req.body).length == 0) {
    body = "";
  } else if (req.headers['content-type'].includes('application/json')) {
    body = JSON.stringify(JSON.parse(req.body), null, 2);
  } else {
    body = decodeURIComponent(req.body.toString());
  }

  const { unique_string } = req.params;
  const method = req.method;
  await addRequest(unique_string, method, head, body);
  res.sendStatus(200);
});

module.exports = gatherRouter;