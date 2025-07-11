const { sendWithResponse, sendWithData } = require("../../Helpers");
const Order = require("../../models/Order");

const orderController = {};


orderController.getAllOrders = async (req, res)=>{
    try {
        const orders = await Order.find({});

        if(!orders.length){
            return sendWithResponse(res, 404, false, "not found!");
        }
        return sendWithData(res, 200, true, orders, "get orders successfully!");
    } catch (error) {
        console.log(error);
        return sendWithResponse(res, 500, false, "Some error for get admin orders");
    }
}


orderController.


module.exports = orderController;