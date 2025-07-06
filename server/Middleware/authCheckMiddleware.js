const jwt = require("jsonwebtoken");
const { sendWithError } = require("../Helpers");

const authCheckMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return sendWithError(res, 401, false, "Unauthorized user!");
  }

  try {
    const decoded = jwt.verify(
      token, "CLIENT_SECRET_KEY"
    );
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Unauthorized", err);
    sendWithError(res, 401, false, "Unauthorized user!");
  }
}; 


module.exports = authCheckMiddleware;
