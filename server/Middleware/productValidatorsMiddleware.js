// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink, read } = require("fs");


const addProductsValidators = [
  check("title")
    .isLength({ min: 1 })
    .withMessage("Title is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Title must not contain anything other than alphabet")
    .trim(),
  check("category")
    .isLength({ min: 1 })
    .withMessage("category is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("category must not contain anything other than alphabet")
    .trim(),
  check("price")
    .isNumeric()
    .isLength({ min: 1 })
    .default(0)
    .withMessage("Price us required"),
  check("salePrice")
    .isNumeric()
    .isLength({ min: 1 })
    .default(0)
    .withMessage("Price us required"),
];


const productValidatorsMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if(Object.keys(mappedErrors).length === 0){
        next();
    }else{
        //remove uploaded files
        if(req.files.length > 0){
            const {filename} = req.files[0];
            unlink(
              path.join(__dirname, `/../public/uploads/products/${filename}`),(err)=>{
                if(err) console.log(err);
              }
            );
        }
        res.status(500).json({
          errors: mappedErrors,
        });
    }
  
};

export default { addProductsValidators, productValidatorsMiddleware };
