const mongoose = require("mongoose");

const connectDB = async ()=>{
    const conn = await mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Connected to Mongodb")
    }).catch(err=> console.log(`Error connect to db ${err}`));
}

module.exports = connectDB;