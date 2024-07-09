const express = require("express");
const { isAuthenticated } = require("../middlewares/userMiddlewares");
const router = express.Router();
const {
  getHomePage,
  login,
  createUser,
} = require("../controllers/userControllers");

router.post("/login", login);
router.post("/signup", createUser);
router.get("/", isAuthenticated, getHomePage);

module.exports = router;
