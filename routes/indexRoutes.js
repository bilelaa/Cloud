const express = require("express")


const app = express.Router()


const authRoutes = require("./auth.routes")
const privateRoutes = require("./private.routes")





app.use("/auth", authRoutes)
app.use("/user",require("../middleware") , privateRoutes)






module.exports = app