const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// connection pool to MYSQL database
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Code2College!", //your own password that you set up when installing MySQL Workbench
  database: "Pokemon_app", //name of your database
});

// Use cors, cross-origin resource sharing (CORS), to help Javascript interact with API
app.use(cors());

// Use express.json() to handle json request data
app.use(express.json());

// Use body-parser to handle url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// ----------- ROUTES -------------

// GET route to display all database entries
app.get("/", (req, res) => {
  const sqlSelect = "SELECT * FROM characters";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// POST route handle inserting a new pokemon to the database
app.post("/api/insert", (req, res) => {
  const pkmType = req.body.type; // extracting the pokemon name and type from the request body
  const pkmName = req.body.name;

  const sqlInsert = "INSERT INTO characters (name, type) VALUES (?,?)"; //execute SQL query to insert new pokemon

  db.query(sqlInsert, [pkmName, pkmType], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// GET route to handle search terms to query the database
/*
app.get("/api/pokemon/search", (req, res) => {
  // get the type value from query parameter
  const type = req.query.pkmType;
  // create the mysql query
  const query = "SELECT * FROM characters WHERE type = ?";
  // execute the query
  db.query(query, [type], (error, results) => {
    if (error) {
      // send the error message as response if any error occurs
      res.status(500).json({ error: error });
    } else {
      // send the query results as response if the query is successful
      console.log(results);
      res.json(results);
    }
  });
});
*/

app.listen(3001, () => {
  console.log("running on http://localhost:3001/");
});