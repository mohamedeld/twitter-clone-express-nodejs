const express = require('express');
const { register } = require('../controller/authController');
const app = express();
const router = express.Router();

app.set("view engine","pug");
app.set("views","./views");
router.route("/").get((req,res)=>{
    res.status(200).render("register")
})
router.route("/").post(register)

module.exports = router;