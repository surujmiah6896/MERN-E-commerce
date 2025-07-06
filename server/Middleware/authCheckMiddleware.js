const jwt = require("jsonwebtoken");
const { sendWithResponse } = require("../Helpers");

const authCheckMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return sendWithResponse(res, 401, false, "Unauthorized user!");
  }

  try {
    const decoded = jwt.verify(
      token, "CLIENT_SECRET_KEY"
    );
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Unauthorized", err);
   return sendWithResponse(res, 401, false, "Unauthorized user!");
  }
}; 


module.exports = authCheckMiddleware;
