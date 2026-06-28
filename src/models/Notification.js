import mongoose from "mongoose";

const notificationSchema =new mongoose.Schema({
    title : String,
    message : String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    isRead:{
        type: Boolean,
        default:false
    }
},{ 
    timestamps: { createdAt: 'created_at', updatedAt: false } 
});

export const Notification = mongoose.model("notifications",notificationSchema);