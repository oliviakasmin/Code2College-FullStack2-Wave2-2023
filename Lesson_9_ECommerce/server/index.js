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
  database: "ECommerce_app", //name of your database
});

// Use cors, cross-origin resource sharing (CORS), to help Javascript interact with API
app.use(cors());

// Use express.json() to handle json request data
app.use(express.json());

// Use body-parser to handle url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// ----------- ROUTES -------------

// GET route to display all contact entries for testing
app.get("/", (req, res) => {
  const sqlSelect = "SELECT * FROM contact";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// POST route submit contact form
app.post("/submit-form", (req, res) => {
  const { firstname, lastname, email, subject } = req.body;

  const sqlInsert =
    "INSERT INTO contact (firstname, lastname, email, subject) VALUES (?,?,?,?)"; //execute SQL query to insert new pokemon

  db.query(sqlInsert, [firstname, lastname, email, subject], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// GET route for all products
app.get("/api/ecommerce/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.json(result);
  });
});

app.listen(3001, () => {
  console.log("running on http://localhost:3001/");
});
