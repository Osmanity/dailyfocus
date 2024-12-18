const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const cors = require("cors");

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./Routes/authRoutes"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
