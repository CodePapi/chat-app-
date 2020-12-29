const router = require("express").Router()
const { catchErrors } = require("../Handlers/error-handlers")
// const User = require("../models/User")
const userController=require("../controller/userController")

router.post("/login", catchErrors(userController.login))
router.post("/register",catchErrors(userController.register))
module.exports=router
