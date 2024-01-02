const client = require("../database/pg");
const Bin = require("./bin.js");

const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requestId: Number,
  binId: Number,
  documentHead: mongoose.Schema.Types.Mixed,
  documentBody: String,
});

const Request = mongoose.model("Request", requestSchema);

// add a request to Postgres
async function addRequest(id, method, head, body) {
  try {
    const { id: binId } = await Bin.findByBin(id);
    console.log('from add Request function');
    console.log(id)

    // Insert the request into the "requests" postgres table
    // The "Returning" keyword returns the id of the row we just added in response
    const request = await client.query(
      "INSERT INTO requests (http_method, bin_id) VALUES ($1, $2) RETURNING id",
      [method, binId]
    );

    // Get primary key for the requests row that was just added
    const requestId = request.rows[0].id;

    // Create a new request object
    const mongoRequest = new Request({
      requestId,
      binId,
      documentHead: head,
      documentBody: body,
    });
    // Save the request object to mongo
    mongoRequest.save();
    return requestId
  } catch (error) {
    console.log(error);
  }
}

// Get all of the requests for a bin based on its unique_string from PG
async function getRequestsByBin(str) {
  try {
    const bin = await client.query("SELECT requests.id AS id, http_method, \
      requests.created_at AS created_at, unique_string\
      FROM requests JOIN bins ON bin_id = bins.id WHERE unique_string = $1 ORDER BY created_at DESC", [str]);
    return bin.rows; // arr of objs
  } catch (error) {
    console.error(error);
  }
}

// delete all requests for specific bin
async function deleteAllByBin(binId) {
  const res = await Request.deleteMany({ binId })
  return res.acknowledged
}

// Get the data for one specific request based on its ID
async function getRequestByRequestID(requestId) {
  const requests = await client.query("SELECT * FROM requests WHERE id = $1", [requestId])
  const request = requests.rows[0];

  const { documentHead, documentBody } = await Request.findOne({ requestId });

  request.headers = documentHead;
  request.body = documentBody;
  return request;
}

module.exports = {
  addRequest,
  getRequestsByBin,
  getRequestByRequestID,
  deleteAllByBin,
};