const mongoose = require("mongoose")

const messagesSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Chatroom is required",
        ref:"Chatroom"
    },
     user: {
        type: mongoose.Schema.Types.ObjectId,
        required: "user is required",
        ref:"User"
    },
     message: {
        type: String,
        required: "message is required",
        
    },
   
  
})
      


module.exports=mongoose.model("messages", messagesSchema)