const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);
    const newUser = await userModel.create({ username, email, password: hash });
    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await userModel.findOne({ email });
    if (!validUser) return next(errorHandler(401, "Invalid credentials"));

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Creadentials"));

    //  console.log(validUser._doc);
    const { password: hashedPassword, ...rest } = validUser._doc;

    const token = jwt.sign(
      { email, username: validUser.username, id: validUser._id },
      process.env.JWT_KEY
    );

    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};
