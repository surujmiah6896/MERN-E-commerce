const { sendWithData, sendWithResponse } = require("../../Helpers");
const Product = require("../../models/Product");

const productController = {};

productController.getFilteredProducts = async (req, res) => {
    try {
      const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
  
      let filters = {};
  
      if (category.length) {
        filters.category = { $in: category.split(",") };
      }
  
      if (brand.length) {
        filters.brand = { $in: brand.split(",") };
      }
  
      let sort = {};
  
      switch (sortBy) {
        case "price-lowtohigh":
          sort.price = 1;
  
          break;
        case "price-hightolow":
          sort.price = -1;
  
          break;
        case "title-atoz":
          sort.title = 1;
  
          break;
  
        case "title-ztoa":
          sort.title = -1;
  
          break;
  
        default:
          sort.price = 1;
          break;
      }
  
      const products = await Product.find(filters).sort(sort);
  
      return sendWithData(res, 200, true, products, "get product successfull");
    } catch (e) {
      console.log(error);
      return sendWithResponse(res, 500, false, "Some error occured" );
    }
  };

module.exports = productController;