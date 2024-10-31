const express = require("express");
const { signup ,signin } = require("../controllers/auth.controller.js");

const router = express.Router()

// router.get("/",(req,res) => {
//     res.send("hey")
// })

router.post('/signup',signup)
router.post('/signin',signin)

router.get("/signup",(req,res) => {
    res.send("hey")
})
module.exports = router
