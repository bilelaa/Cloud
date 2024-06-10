const express = require("express")


const app = express.Router()

app.post("/register", require("../controllers/auth.controller").register)
app.post("/login", require("../controllers/auth.controller").login)
app.post("/send-email", require("../controllers/auth.controller").sendEmail)
app.post("/verify-email", require("../controllers/auth.controller").verifyEmail)
app.get("/logout", require("../controllers/auth.controller").logout)








module.exports = app