const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const { requireLogin } = require("./middleware");
const loginRoute = require("./routes/loginRoute");
const session = require("express-session");
const registerRoute = require("./routes/registerRoute");
const logoutRoute = require("./routes/logoutRoute");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","pug");

app.set("views","./views");

app.use(express.static(path.join(__dirname,"public")))

app.use(session({
    secret:"bbq chips",
    resave:true,
    saveUninitialized:true
}))

app.use("/login",loginRoute);
app.use("/register",registerRoute);
app.use("/logout",logoutRoute);

app.get("/",requireLogin,(req,res)=>{
  const payload = {
    pageTitle:"Home Page",
    user:req.session?.user
  }
  res.status(200).render("home",payload);
})

const PORT = process.env.PORT || 8080;
connectDB();
const server = app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})


process.on("unhandledRejection",(err)=>{
  console.error("Unhandled Rejection:", err.message);
  server.close(() => {
    process.exit(1); // Exit the process with failure
  });
})

