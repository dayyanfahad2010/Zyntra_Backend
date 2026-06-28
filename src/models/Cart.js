import mongoose from "mongoose";

const cartSchema =new mongoose.Schema({
    user :  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },products:[
        {
            product :{
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity:{
                type:Number,
                default:1,
                min:1
            }
        }
    ]
});

export const Cart = mongoose.model("carts",cartSchema);