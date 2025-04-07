const express = require('express');
const { login } = require('../controller/authController');
const app = express();
const router = express.Router();

app.set("view engine","pug");
app.set("views","./views");
router.route("/").get((req,res)=>{
    if(req.session){
        req.session.destroy(()=>{
            res.redirect("/login");
        })
    }
})
router.route("/").post(login)

module.exports = router;