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


orderController.getOrderDetails = async (req, res) =>{
    try {
        const {id} = req.params;

        const order = await Order.findById(id);
        if(!order){
            return sendWithResponse(res, 404, false, "not found!");
        }

        return sendWithData(res, 200, true, order, "get order successfully!");
    } catch (error) {
      console.log(error);
      return sendWithResponse(
        res,
        500,
        false,
        "Some error for get admin orders"
      );
    }
}

orderController.updateOrderStatus = async (req, res) =>{
     try {
       const { id } = req.params;
       const {orderStats} = req.body;

       const order = await Order.findById(id);
       if (!order) {
         return sendWithResponse(res, 404, false, "not found!");
       }

       const updateOrder = await Order.findByIdAndUpdate(id, { orderStats });

       return sendWithData(
         res,
         200,
         true,
         updateOrder,
         "get order successfully!"
       );
     } catch (error) {
       console.log(error);
       return sendWithResponse(
         res,
         500,
         false,
         "Some error for get admin orders"
       );
     }
}


module.exports = orderController;