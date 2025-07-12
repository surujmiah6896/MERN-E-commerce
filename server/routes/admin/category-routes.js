const express = require("express");
const { storeCategory } = require("../../controllers/admin/categoryController");

const router = express.Router();

router.post("/add", storeCategory);

module.exports = router;