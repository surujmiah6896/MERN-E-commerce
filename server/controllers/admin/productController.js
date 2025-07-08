const { sendWithResponse, sendWithData } = require("../../utilities/useHelper");
const Product = require("../../models/Product");
const productController = {};
const fs = require('fs');
const path = require("path");
const {unlink} = fs

//add product
productController.addProduct = async(req, res) =>{
    try{
      // Extract image filename from uploaded file (req.files[0])
      const uploadedFile =
        req.files && req.files.length > 0 ? req.files[0].filename : null;

      const {
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview,
      } = req.body;

      const newProduct = new Product({
        title,
        description,
        image: uploadedFile,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview,
      });

      await newProduct.save();
      return sendWithData(res, 200, true, newProduct, "Product Add Successful");
    }catch(err){
      console.log("add controller error",err);
      return sendWithResponse(res, 500, false, err);
    }
}

//edit product
productController.editProduct = async(req, res) => {
    try{
        const {
          image,
          title,
          description,
          category,
          brand,
          price,
          salePrice,
          totalStock,
          averageReview,
        } = req.body;

        const id = req.params;
        const findProduct = Product.findById(id);
        if (!findProduct) {
          return sendWithResponse(res, 401, false, "Product not found");
        }

        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.salePrice =
          salePrice === "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;
        findProduct.averageReview = averageReview || findProduct.averageReview;

        await findProduct.save();
        return sendWithResponse(res, 200, true, "product update Successfully");

    }catch(err){
        return sendWithResponse(res, 500, false, "some server error");
    }
    
};

//delete a product
productController.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the product first to get the image name
    const product = await Product.findById(id);

    if (!product) {
      return sendWithResponse(res, 404, false, "Product not found");
    }

    // 2. Delete the image file if it exists
    if (product.image) {
      const imgPath = path.join(
        __dirname,
        `../../public/uploads/products/${product.image}`
      );

      if (fs.existsSync(imgPath)) {
        fs.unlink(imgPath, (err) => {
          if (err) {
            console.error("Failed to delete image:", err);
          } else {
            console.log("Image file deleted:", imgPath);
          }
        });
      } else {
        console.warn("Image file not found:", imgPath);
      }
    }

    // 3. Delete the product from the database
    const delete_product = await Product.findByIdAndDelete(id);
    return sendWithData(
      res,
      200,
      true,
      delete_product,
      "Product delete successfully"
    );
  } catch (e) {
    console.log(e);
    return sendWithResponse(res, 500, false, "Some Error Occured");
  }
};

//get all product
productController.getAllProduct = async (req, res) => {
    try {
      const allProducts = await Product.find({});

      if (!allProducts) {
        return sendWithResponse(res, 401, false, "Empty product!");
      }
      return sendWithData(res, 200, true, allProducts, "product get successfully");
    } catch (e) {
      console.log(e);
      return sendWithResponse(res, 500, false, "Some Error Occured");
    }
}

module.exports = productController;