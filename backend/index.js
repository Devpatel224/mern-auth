const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const multer = require("multer")
const userRouter = require("./routes/user.route")
const authRouter = require("./routes/auth.route")
const path = require("path")


dotenv.config();



app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

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