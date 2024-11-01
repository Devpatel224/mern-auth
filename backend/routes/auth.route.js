const express = require("express");
const { signup ,signin,google } = require("../controllers/auth.controller.js");

const router = express.Router()

// router.get("/",(req,res) => {
//     res.send("hey")
// })

router.get("/google",(req,res)=>{
    res.send("HI")
})

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)

router.get("/signup",(req,res) => {
    res.send("hey")
})
module.exports = router
