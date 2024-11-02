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
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{
            $set:{
                username : req.body.username,
                email:req.body.email,
                password:req.body.password
            }
        },
    {new:true});
    const {password,...rest} = updatedUser._doc
    res.status(200).json(rest)
    }catch(err){
        return next(err)
    }
}