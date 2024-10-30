const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")

const dotenv = require("dotenv")

const userRouter = require("./routes/user.route")
const authRouter = require("./routes/auth.route")

dotenv.config();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to db");    
})
.catch((err)=>{
    console.log(err);
     
}) 


app.use("/user",userRouter)
app.use("/auth",authRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})

app.listen(3000,()=>{
    console.log("It's running");    
}) 