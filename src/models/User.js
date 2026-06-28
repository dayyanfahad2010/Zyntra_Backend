import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username : String,
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true,
    },
    role: {
        type:String,
        enum:[
            "user",
            "admin"
        ],
        default:"user"
    },
    otp: String,
    otpExpiresAt: Date,
},{ 
    timestamps: { createdAt: 'created_at', updatedAt: false } 
});

export const User = mongoose.model("users",userSchema);