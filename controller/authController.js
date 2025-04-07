const asyncHandler = require("../lib/asyncHandler");
const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");

const register = asyncHandler(async (req,res)=>{
    const firstName = req.body?.firstName?.trim();
    const lastName = req.body?.lastName?.trim();
    const username = req.body?.username?.trim();
    const email = req.body?.email?.trim();
    const password = req.body?.password?.trim();
    const payload = req.body;
    if(!firstName || !lastName || !username || !email || !password){
        payload.errorMessage = "All fields are required."
        return res.status(200).render("register",payload)
    }
    const user = await User.findOne({$or:[{username},{email}]});
    if(user){
        payload.errorMessage = "Username or email already exists";
        return res.status(200).render("register",payload);
    }
    const newUser = await User.create({
        firstName,
        lastName,
        username,
        email,
        password
    });
    if(newUser){
        req.session.user = {
            _id:newUser._id,
            firstName:newUser.firstName,
            lastName:newUser.lastName,
            username:newUser.username,
            email:newUser.email,
            profilePic:newUser.profilePic,
        };
        return res.status(200).redirect("/");
    }
})


const login = asyncHandler(async (req,res,next)=>{
    const email = req.body?.email?.trim();
    const password = req.body?.password?.trim();
    const payload = req.body;
    if(!email || !password){
        payload.errorMessage = "All fields are required."
        return res.status(200).render("login",payload);
    }
    const user = await User.findOne({email});
    if(!user){
        payload.errorMessage = "Invalid credentials";
        return res.status(200).render("login",payload);
    }
    const isMatch = await bcrypt.compare(password,user?.password);
    if(!isMatch){
        payload.errorMessage = "Invalid credentials";
        return res.status(200).render("login",payload);
    }
    req.session.user = {
        _id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        username:user.username,
        email:user.email,
        profilePic:user.profilePic,
    };
    return res.status(200).redirect("/");
})


module.exports = {
    register,
    login
}