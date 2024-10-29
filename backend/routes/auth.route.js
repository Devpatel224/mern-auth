const express = require("express");
const { signup } = require("../controllers/auth.controller.js");

const router = express.Router()

// router.get("/",(req,res) => {
//     res.send("hey")
// })

router.post('/signup',signup)

router.get("/signup",(req,res) => {
    res.send("hey")
})
module.exports = router
