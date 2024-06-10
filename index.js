const express = require("express")

const path = require("path")
const app = express()
require("dotenv").config()

const helmet = require("helmet")
const cookieParser = require('cookie-parser')


app.use(cookieParser())
app.use(express.json({limit:"5mb"}))
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({ maxAge: 90 * 24 * 60 * 60, force: true }));
app.use(helmet.dnsPrefetchControl());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      
      defaultSrc: ["'self'",process.env.REACT],
      imgSrc: ["'self'", "https://res.cloudinary.com"],
      scriptSrc: ["'self'",process.env.REACT],
      connectSrc: ["'self'",process.env.REACT],
    },
  })
);


   
const cors = require('cors')
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.REACT);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); 
  
  next();
});




app.use("/api", require("./routes/indexRoutes"))




app.use(express.static(path.join(__dirname, "views/dist")));
app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "views/dist", "index.html"));
});






app.listen(4444, () => {
  console.log("server up at port 4444");
})