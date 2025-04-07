const {models,model,Schema} = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
        trim:true
    },
    lastName:{
        type:String,
        required:[true,"Last name is required"],
        trim:true
    },
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true,
        minLength:[6,"Password must be at least 6 characters"]
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:"30d"});
}

const User = models.User || model("User",userSchema);

module.exports = User;