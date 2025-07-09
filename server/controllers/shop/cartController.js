const { sendWithResponse, sendWithData } = require("../../Helpers");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const cartController = {};

cartController.addToCart = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      if (!userId || !productId || quantity <= 0) {
        return sendWithResponse(res, 400, false, "Invalid data provided!");
      }
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return sendWithResponse(res, 400, false, "Product not found");
      }
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      const findCurrentProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (findCurrentProductIndex === -1) {
        cart.items.push({ productId, quantity });
      } else {
        cart.items[findCurrentProductIndex].quantity += quantity;
      }
  
     const cartItem = await cart.save();
      return sendWithData(
        res,
        200,
        true,
        cartItem,
        "product add to cart successfully"
      );
    
    } catch (error) {
      console.log(error);
      return sendWithResponse(res, 500, false, "Product add to cart error");
    }
  };

module.exports = cartController;