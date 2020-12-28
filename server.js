require("dotenv").config()
const app = require("./app")
const mongoose=require("mongoose")
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    !err?console.log("mongodb connected"):console.error("error "+ err.message)
})

//bring in all the models
require("./models/User")
require("./models/Chatroom")
require("./models/Messages")

const PORT=process.env.PORT
app.listen(PORT, (err) => {
    !err&&console.log("running in port " + PORT)
})

