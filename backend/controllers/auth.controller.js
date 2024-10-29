const userModel = require("../models/user.model.js")
const bcrypt = require('bcrypt')

exports.signup = async (req,res,next) => {
    try{const {username,email,password} = req.body  

    const hash = bcrypt.hashSync(password,10)
    const newUser = await userModel.create({username,email,password:hash})
    res.status(201).json({message:"User Created Successfully"})
    }catch(err){
        next(err)
    }
} 