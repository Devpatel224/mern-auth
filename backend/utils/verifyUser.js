const jwt = require('jsonwebtoken')
const { errorHandler } = require("./error.js");


exports.verifyToken = (req,res,next)=>{
    
    const token = req.cookies.token;
    console.log(token)
    if(!token){
        return next(errorHandler(401,"You need to Login"))
    }
        jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
            if(err) return next(errorHandler(401,"Token is not valid"))
             
            req.user = user;
            next()
        }) 


}