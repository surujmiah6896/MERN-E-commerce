const express = require('express');
const {
  addProduct,
  editProduct,
  deleteProduct,
} = require("../../controllers/admin/productController");

const router = express.Router();


//first image upload
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);


module.exports = router;