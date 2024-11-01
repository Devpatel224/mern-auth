const mongoose = require("mongoose");

const userSchema =  mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTViQp7LQPyaVsYD6wh40Uvlqs6R-OXbGJjvG6EzZYgl9YjLJuoXko_Y-awh2wRGZ3-OXo&usqp=CAU",
        
    }
},{timestamps:true});

module.exports = mongoose.model("User",userSchema)

