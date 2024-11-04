const express = require("express");
const router = express.Router()
const { verifyToken } = require("../utils/verifyUser.js");
const {updateUser,deleteUser} = require("../controllers/user.controller.js")

// router.get("/",)

router.get("/delete",(req,res) => {
   res.send("hey")   
})

router.post("/update/:id",verifyToken,updateUser)
router.delete("/delete/:id",verifyToken,deleteUser)

module.exports = router