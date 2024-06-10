const express = require("express")


const app = express.Router()

app.get("/check-auth" ,require("../controllers/private.controller").private)
app.post("/update-profile-picture" ,require("../controllers/private.controller").updateProfilePicture)








module.exports = app