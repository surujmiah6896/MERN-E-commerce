const express = require("express");
const {
  createOrder,
  getAllOrdersByUser,
} = require("../controllers/orderController");


const router = express.Router();

router.post("/create", createOrder);
// router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
// router.get("/details/:id", getOrderDetails);

module.exports = router;
