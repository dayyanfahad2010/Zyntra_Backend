import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const connectDB =async ()=>{
    try {
        console.log(process.env.MONGO_URI);
       await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected ");
        
    } catch (error) {
    console.error("ERROR NAME:", error.name);
    console.error("ERROR MESSAGE:", error.message);
    console.error(error);
}
}

export default connectDB;