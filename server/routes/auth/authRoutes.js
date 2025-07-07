const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../../controllers/auth/authController");
const { sendWithData } = require("../../Helpers/index");
const authCheckMiddleware = require("../../Middleware/authCheckMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authCheckMiddleware, (req, res) => {
  const user = req.user;
  sendWithData(res, 200, true, user, "Authenticated User!");
});


module.exports = router;