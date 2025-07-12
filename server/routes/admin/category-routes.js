const express = require("express");
const {
  storeCategory,
  getAllCategory,
} = require("../../controllers/admin/categoryController");

const router = express.Router();

router.post("/add", storeCategory);
router.get('/get', getAllCategory);

module.exports = router;