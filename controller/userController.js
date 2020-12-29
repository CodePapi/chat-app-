const User = require("../models/User")
const sha256 = require("js-sha256")
const jwt = require("jwt-then")
exports.register = async (req, res) => { 
    const { name, email, password } = req.body
    const emailRegex = /@gmail.com|@hotmail.com|@yahoo.com|@live.com|@mail.com$/
    if (!emailRegex.test(email)) throw "Email format is not supported"
    if (password < 6) throw "Password must have not less than 6 characters"
    
    const userExist = await User.findOne({ email })
    if (userExist) throw "User with same mail already exists"
    const user = new User({ name, email, password:sha256(password+process.env.SALT) })
    
    await user.save()

    res.json({
        message:"user successfully registered"
    })
}
exports.login = async (req, res) => { 
    const { email, password } = req.body
    const user = await User.findOne({ email, password: sha256(password + process.env.SALT) })
    if (!user) throw "incorrect user credentials"
    
    const token = await jwt.sign({ id: user.id }, process.env.SECRET)

    res.json({
        message: "user login was successful",
        token,
        user
    })
}