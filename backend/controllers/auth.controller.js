const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {  
  try {
    const { username, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);
    const newUser = await userModel.create({ username, email, password: hash});

    const token = jwt.sign({id:newUser._id,username:newUser.username,email:newUser.email},process.env.JWT_KEY)
      const {password:hashPassword,...rest} = newUser._doc
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie("token", token, { httpOnly: true, expires: expiryDate });

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
    res.cookie("token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

exports.google = async (req, res, next) => {
  try {
    const { email, name, photo } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.JWT_KEY
      );
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie("token", token, { httpOnly: true, expires: expiryDate }).status(200).json(user)

      
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);


      const newUser = await userModel.create({
        username: name.split(" ").join("").toLowerCase() + (Math.floor(Math.random() * 10000)),
        email: email,
        password: hashedPassword,
        profilePicture: photo,
      });
      const token = jwt.sign({id:newUser._id,username:newUser.username,email:newUser.email},process.env.JWT_KEY)
      const {password:hashPassword,...rest} = newUser._doc
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie("token", token, { httpOnly: true, expires: expiryDate }).status(200).json(newUser)
    }
  } catch (err) {
    next(err);
  }
};

exports.checktoken = (req,res) => {
    let token = req.cookies.token
    if(token){
      res.status(200).json({authenticated:true})
    }
    else{
      res.json({authenticated:false})
    }
}

exports.signout = async (req,res,next) => {
  try{res.clearCookie("token").status(200).json("Signout Success!")}
  catch(e){
    next(e)
  }
}