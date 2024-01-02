// Interfaces with postgres to store bin and request data

const client = require("../database/pg");

// Fetch all bins using postgres
async function all() {
  try {
    const query = `SELECT bins.id, bins.unique_string, 
                          bins.created_at, 
                          MAX(requests.created_at) AS most_recent_request_date 
  		            FROM bins 
  		              LEFT JOIN requests ON bins.id = bin_id 
 		                GROUP BY bins.id 
                    ORDER BY most_recent_request_date DESC NULLS LAST`;
    const bins = await client.query(query);
    return bins.rows;
  } catch (error) {
    console.error(error);
  }
}

// Find bin by unique_str
async function findByBin(str) {
  try {
    const bin = await client.query("SELECT id FROM bins WHERE unique_string = $1", [str]);
    return bin.rows[0];
  } catch (error) {
    console.error(error);
  }
}

// Create a bin
async function createNew() {
  try {
    /// need to add functionality to add source
    const newBin = await client.query(
      "INSERT INTO bins DEFAULT VALUES RETURNING id, unique_string, created_at"
    );
    return newBin.rows[0];
  } catch (error) {
    console.error(error);
  }
}

// check if unique_string is valid
async function validStr(str) {
  if (!(typeof str === "string" && str.length === 6)) {
    return false;
  }

  const exists = await client.query(
    "SELECT EXISTS (SELECT 1 FROM bins WHERE unique_string = $1 LIMIT 1);",
    [str]
  );
  return exists.rows[0].exists;
}

// delete bin from Postgre
async function deleteBin(id) {
  try {
    await client.query("DELETE FROM bins WHERE id = $1", [id]);
  } catch (error) {
    console.log(error);
  }
}

const Bin = {
  all,
  findByBin,
  createNew,
  deleteBin,
  validStr,
};

module.exports = Bin;