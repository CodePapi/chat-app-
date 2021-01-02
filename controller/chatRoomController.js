const Chatroom=require("../models/Chatroom")

exports.createChatroom = async (req, res) => {
    const { name } = req.body
    const chatroom = new Chatroom({
        name
    })
    // const nameRegex = /^[A-Za-z]+\$]/
    
    // if (!nameRegex.test(name)) throw "chatroom name can only contain Alphabet"
    
    const charRoomExist = await Chatroom.findOne({ name })
    if(charRoomExist) throw "chatroom with the name already exists"
   await chatroom.save()
    res.json({
        message: "chatroom created",
        name
})
}

exports.getAllChatRoom = async (req, res) => {
    const chatrooms = await Chatroom.find({})
    
    res.json(chatrooms)
}