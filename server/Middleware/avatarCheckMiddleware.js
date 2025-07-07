const  useSingleUploader  = require("../utilities/useSingleUploader");

const avatarCheckMiddleware = (req, res, next) => {
    const upload = useSingleUploader(
      "products",
      ["image/jpeg", "image/jpg", "image/png"],
      1000000,
      "Only .jpg, jpeg or .png format allowed!"
    );

    //call the middleware function

    upload.any()(req, res, (err)=>{
        if(err){
          return  res.status(400).json({
              errors: {
                avatar: {
                  msg: err.message,
                },
              },
            });
        }else{
            next();
        }
    });
  
}

module.exports = avatarCheckMiddleware;
