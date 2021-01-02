const express = require("express")
const app = express()
var cors = require('cors')

 


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//register controllers
app.use("/user",require("./routers/User"))
app.use("/chatroom",require("./routers/Chatroom"))
//setup error handlers
const errorHandlers = require("./Handlers/error-handlers")
app.use(errorHandlers.notFound)
app.use(errorHandlers.mongoseErrors)
if (process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors)
} else {
    app.use(errorHandlers.productionErrors)
}


module.exports = app