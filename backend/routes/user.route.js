const express = require("express");
const router = express.Router()
const { verifyToken } = require("../utils/verifyUser.js");
const {updateUser} = require("../controllers/user.controller.js")

// router.get("/",)

router.post("/update/:id",verifyToken,updateUser)

module.exports = router