const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

//GET
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//GET SINGLE ITEM
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM products WHERE product_id = '${req.params.id}'`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//POST
router.post("/", (req, res) => {
  const {
    sku,
    name,
    price,
    weight,
    descriptions,
    thumbnail,
    image,
    category,
    stock,
  } = req.body;
  try {
    con.query(
        `INSERT INTO products (
        sku, 
        name,
        price,
        weight,
        descriptions,
        thumbnail,
        image,
        category,
        stock)
        values
        ('${sku}', '${name}', '${price}', '${weight}', '${descriptions}', '${thumbnail}', '${image}', '${category}, '${stock}')`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//DELETE
router.delete("/:id", (req, res) => {
  try {
      con.query(`DELETE FROM products WHERE product_id = '${req.params.id}'`, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
