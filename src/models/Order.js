import mongoose from "mongoose";

const orderSchema =new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
        unique:false
    },
    products:[
        {
            product :{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products"
            },
            quantity: {
                type: Number,
                default:1
            }
        }
    ],
    recieverName:String,
    phoneNumber:Number,
    totalPrice:Number,
    shippingAddress: String,
    paymentMethod: String,
    status: {
        type:String,
        enum: [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default:"Pending"
    }
},{ 
    timestamps: { createdAt: 'created_at', updatedAt: false } 
});

export const Order = mongoose.model("orders",orderSchema);