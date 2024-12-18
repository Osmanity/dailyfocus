const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  signupUser,
  signinUser,
  GetProfileUser,
} = require("../controllers/authController");

// Middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", test);
router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.get("/profile", GetProfileUser);

module.exports = router;
