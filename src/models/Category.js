import mongoose from "mongoose";

const categorySchema =new mongoose.Schema({
    name : String,
    icon:String
});

export const Category = mongoose.model("categories",categorySchema);