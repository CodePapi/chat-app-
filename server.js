require("dotenv").config()
const app = require("./app")
const mongoose=require("mongoose")
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }, (err) => {
    !err?console.log("mongodb connected"):console.error("error "+ err.message)
})

//bring in all the models
require("./models/User")
require("./models/Chatroom")
require("./models/Messages")

const PORT=process.env.PORT
const Server=app.listen(PORT, (err) => {
    !err&&console.log("running in port " + PORT)
})

const io = require("socket.io")(Server)
const jwt=require("jwt-then")
io.use(async(socket, next) => {
    

     try {
        const token =socket.handshake.query.token
        const payload = await jwt.verify(token, process.env.SECRET)
        socket.userId = payload.id
        next()
    } catch (error) {console.error(error)}
})

io.on("connection", (socket) => {
    console.log("Connected: " + socket.userId)
    
    socket.on("disconnect", () => {
        console.log("Disconnected: " + socket.userId)
    })
})