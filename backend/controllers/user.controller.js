const userModel = require("../models/user.model.js")
const { errorHandler } = require("../utils/error.js")
const bcrypt = require('bcrypt')




exports.updateUser = async (req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"You can only change in your account"))
    }    
    try{
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password,10)
        }
        
        profilePicturePath = req.file ? `/uploads/${req.file.filename}`:null;

        const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{
            $set:{
                username : req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePicture:profilePicturePath
            }
        },
    {new:true});
    const {password,...rest} = updatedUser._doc
    res.status(200).json(rest)
    }catch(err){
        return next(err)
    }
}

exports.deleteUser = async (req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"You can delete Onlt your Account"))
    }
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted Successfully")
    } catch (error) {
        next(error)
    }
}


exports.uploadPhoto = async (req,res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
    
      // If file exists, it was uploaded successfully
      res.status(200).json({
        message: "File uploaded successfully",
        file: req.file, // req.file contains info about the uploaded file
      });
}