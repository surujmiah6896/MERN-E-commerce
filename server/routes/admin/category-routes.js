const express = require("express");
const {
  storeCategory,
  getAllCategory,
  updateCategory,
} = require("../../controllers/admin/categoryController");

const router = express.Router();

router.post("/add", storeCategory);
router.get('/get', getAllCategory);
router.put('/update?id', updateCategory);

module.exports = router;