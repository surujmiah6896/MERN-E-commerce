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

cartController.fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return sendWithResponse(res, 400, false, "User id is required");
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return sendWithResponse(res, 404, false, "Cart not found!");
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    const sendData = {
      ...cart._doc,
      items: populateCartItems,
    };
    return  sendWithData(res, 200, true, sendData, "get data Successfully");
  } catch (error) {
    console.log(error);
    return sendWithResponse(res, 500, false, "error");
  }
};

cartController.deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return sendWithResponse(res, 400, false, "Invalid data provided!");
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return sendWithResponse(res, 404, false, "Cart not found!");
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    const sendData = {
      ...cart._doc,
      items: populateCartItems,
    };
    return sendWithData(res, 200, true, sendData, "get data successfully");
  } catch (error) {
    console.log(error);
    return sendWithResponse(res, 500, false, "Error");
  }
};

module.exports = cartController;