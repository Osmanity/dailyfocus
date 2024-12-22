const allowedOrigins = ["http://localhost:5173", "https://osmanity.github.io"];

const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  signupUser,
  signinUser,
  GetProfileUser,
  GetGreetingWithQuote,
} = require("../controllers/authController");

// Middleware
router.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
router.get("/", test);
router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.get("/profile", GetProfileUser);
router.get("/greeting", GetGreetingWithQuote);

module.exports = router;
