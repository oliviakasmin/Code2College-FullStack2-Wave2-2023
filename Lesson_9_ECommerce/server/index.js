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
  database: "ecommerce_app", //name of your database
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

// GET route for cart
app.get("/api/ecommerce/cart", (req, res) => {
  const sql = "SELECT * FROM cart_items JOIN products ON cart_items.product_id = products.id";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.json(result);
  });
});

// DELETE route for cart
app.delete("/api/ecommerce/cart/:id", (req, res) => {
  const {id} = req.params
  const sql = "DELETE FROM cart_items WHERE product_id=?"

  db.query(sql,[id], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
  
    res.setHeader("Content-Type", "application/json");
    res.json(result);
  });
});

// POST route for cart
app.post("/api/ecommerce/cart/:id", (req, res) => {
  const {id} = req.params
  const sql = "INSERT INTO cart_items (product_id) VALUES(?)"

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
  
    res.setHeader("Content-Type", "application/json");
    res.json(result);
  });
});


app.get('/api/search', (req, res) => {
  const searchTerm = "%" + req.query.searchTerm + "%"
  console.log({searchTerm})

  const sql = "SELECT * from products where name like ?"
  db.query(sql, [searchTerm],(err, result) => {
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
