const express = require("express");
const orderController = require("../../controllers/admin/orderController");

const router = express.Router();

router.get("/get", orderController.getAllOrders);
router.get("/details/:id", orderController.getOrderDetails);
router.put("/update/:id", updateOrderStatus);


module.exports = router;