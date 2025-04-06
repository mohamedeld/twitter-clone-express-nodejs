const express = require("express");
const path = require("path");
const { requireLogin } = require("./middleware");
const loginRoute = require("./routes/loginRoute");
require("dotenv").config();

const app = express();

app.use(express.json());
app.set("view engine","pug");

app.set("views","./views");

app.use(express.static(path.join(__dirname,"public")))

app.use("/login",loginRoute);
app.get("/",requireLogin,(req,res)=>{
  const payload = {
    pageTitle:"Home Page",
  }
  res.status(200).render("home",payload);
})

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})


process.on("unhandledRejection",(err)=>{
  console.error("Unhandled Rejection:", err.message);
  server.close(() => {
    process.exit(1); // Exit the process with failure
  });
})

