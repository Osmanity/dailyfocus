const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helper/auth");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");

const test = (req, res) => {
  res.json("Test is working");
  console.log("Test function has been called");
};

// signup user ENDPOINT
const signupUser = async (req, res) => {
  console.log("Signup function has been called");
  try {
    const { name, email, password } = req.body;

    // Check if name, email, and password are provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // check is passsword is at least 8 characters
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }

    //check email
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   return res.status(400).json({ error: "Invalid email address" });
    // }

    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    await console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// signin user ENDPOINT
const signinUser = async (req, res) => {
  try {
    console.log("Signin function has been called");
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }

    //check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }

    //create token/cookie
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }

    // //send response
    // return res.status(200).json({
    //   message: "Signin successful",
    // });
  } catch (error) {
    await console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get user profile ENDPOINT
const GetProfileUser = async (req, res) => {
  console.log("GetProfileUser function has been called");
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) throw err;
        res.json(user);
      });
    } else {
      res.json(null);
    }
  } catch (error) {
    await console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Konfiguration för OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Funktion för hälsning och citat
const GetGreetingWithQuote = async (req, res) => {
  console.log("GetGreetingWithQuote function has been called");
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "Ingen åtkomst" });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Ogiltig token" });
      }

      // Generate a motivational quote in Swedish using OpenAI's API
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              "Skapa ett motiverande citat på svenska, högst 20 tecken, baserat på inspiration från kända citat, med att nämna upphovspersonen. i slutet",
          },
        ],
        max_tokens: 50,
      });

      const quote = response.choices[0].message.content.trim();

      res.json({
        greeting: `Välkommen, ${user.name}!`,
        quote: quote,
      });
    });
  } catch (error) {
    console.error("Error in genarting greeting", error);
    res.status(500).json({ error: "Cound not genarting greeting in backend" });
  }
};

module.exports = {
  test,
  signupUser,
  signinUser,
  GetProfileUser,
  GetGreetingWithQuote,
};
