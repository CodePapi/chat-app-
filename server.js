require("dotenv").config()
const app = require("./app")
const mongoose=require("mongoose")
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }, (err) => {
    !err?console.log("mongodb connected"):console.error("error "+ err.message)
})
const cors = require("cors")
//bring in all the models
require("./models/User")
require("./models/Chatroom")
require("./models/Messages")

const PORT=process.env.PORT
const Server=app.listen(PORT, (err) => {
    !err&&console.log("running in port " + PORT)
})



const io = require("socket.io")(Server, {
    cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})
const jwt = require("jwt-then")
const Message = require("./models/Messages");
const User = require("./models/User")
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



     socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
})