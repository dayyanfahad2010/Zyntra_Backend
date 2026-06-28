import mongoose from "mongoose";

const productSchema =new mongoose.Schema({
    title : String,
    description : String,
    stock: Number,
    price: Number,
    images: [{url:String,public_id:String}],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    }
},{ 
    timestamps: { createdAt: 'created_at', updatedAt: false } 
});

export const Product = mongoose.model("products",productSchema);