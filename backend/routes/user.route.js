const express = require("express");
const router = express.Router()
const { verifyToken } = require("../utils/verifyUser.js");
const {updateUser,deleteUser,uploadPhoto} = require("../controllers/user.controller.js")
const upload = require("../config/multer-config.js")

// router.get("/",)

router.get("/delete",(req,res) => {
   res.send("hey")   
})

router.get("/upload",(req,res) => {
    res.send("Hyey")
})

router.post("/upload",upload.single('image'),uploadPhoto)
router.post("/update/:id",verifyToken,upload.single("profilePicture"),updateUser)  
router.delete("/delete/:id",verifyToken,deleteUser)

module.exports = router