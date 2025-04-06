const express = require("express");
require("dotenv").config();

const app = express();

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

