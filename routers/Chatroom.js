const router = require('express').Router()
const { catchErrors } = require('../Handlers/error-handlers')
const chatroomController = require('../controller/chatRoomController')
const {auth }= require('../middlewares/auth')

router.post('/',auth, catchErrors(chatroomController.createChatroom))
module.exports = router
