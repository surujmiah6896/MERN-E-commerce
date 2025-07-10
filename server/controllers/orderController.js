
const { sendWithData, sendWithResponse } = require("../Helpers");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

const orderController = {};

orderController.createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        const sendData = {
          orderId: newlyCreatedOrder._id,
        };

        return sendWithData(res, 201, true, sendData, "order Create Successfully");
  } catch (e) {
    console.log(e);
    return sendWithResponse(res, 500, false, "Some order create error");
  }
};

orderController.getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return sendWithResponse(res, 404, false, "No Found!");
    }
    return sendWithData(res, 200, true, orders, "get order Successful!");
    
  } catch (e) {
    console.log(e);
    return sendWithResponse(res, 500, false, "Some error occured!");
  }
};

orderController.getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return sendWithResponse(res, 404, false, "not found");
    }

    return sendWithData(res, 200, true, order, "order get successfully!");
  } catch (e) {
    console.log(e);
    return sendWithResponse(res, 500, false, "Some error occured!");
  }
};


module.exports = orderController;
