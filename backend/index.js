const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv")

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to db");    
})
.catch((err)=>{
    console.log(err);
    
})

app.get("/",(req,res)=>{
    res.send("Hey")
})

app.listen(3000,()=>{
    console.log("It's running");    
})