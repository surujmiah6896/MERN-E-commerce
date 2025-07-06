const { jwt } = require("jsonwebtoken");
const { sendWithError } = require("../Helpers");

const authCheckMiddelware = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return sendWithError(res, 401, false, "Unauthorised user!");
    }

    try{
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
        console.log("decoded", decoded);
        req.user = decoded;
        next();

    }catch(err){
        console.log("Unauthorised", err);
        
        return sendWithError(res, 401, false, "Unauthorised user!");
    }
}

module.exports = authCheckMiddleware;