const express = require('express');
const app = express();
const router = express.Router();

app.set("view engine","pug");
app.set("views","./views");
router.route("/").get((req,res)=>{
    res.status(200).render("register")
})
router.route("/").post((req,res)=>{
    const firstName = req.body?.firstName?.trim();
    const lastName = req.body?.lastName?.trim();
    const username = req.body?.username?.trim();
    const email = req.body?.email?.trim();
    const password = req.body?.password?.trim();
    const payload = req.body;
    if(!firstName || !lastName || !username || !email || !password){
        payload.errorMessage = "All fields are required."
        return res.status(200).render("register",payload)
    }else{

    }

})

module.exports = router;