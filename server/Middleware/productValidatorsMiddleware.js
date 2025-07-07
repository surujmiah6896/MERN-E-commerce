// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink, read } = require("fs");


const addProductsValidators = [
  check("title").notEmpty().withMessage("Title is required"),
  check("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than zero"),
];


const productValidatorsMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if(Object.keys(mappedErrors).length === 0){
        next();
    }else{
        //remove uploaded files
        if(req?.files?.length > 0){
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

module.exports = { addProductsValidators, productValidatorsMiddleware };
