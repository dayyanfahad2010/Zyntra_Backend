import { User } from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
import successResponse from "../responseHandler/successResponse.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../services/sendEmail.js";
dotenv.config();

const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username)
      throw new Error("All fields are required");
    if (password.length < 8)
      throw new Error("Password must be at least 8 characters");
    const hashedPassword = await bcrypt.hash(password, 14);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const { _id ,role} = user;
    successResponse(res, "User SignUp Successfully", { _id, email ,role});
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email or Password are required");
    const user = await User.findOne({ email });
    if (!user){
      const error= new Error("User not found");
      error.statusCode = 404;
      throw error;
    } 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      const error= new Error("Invalid Credentails");
      error.statusCode = 401;
      throw error;
    } 
    const userToken = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SCRET_KEY,
      { expiresIn: "3h" },
    );
    res.cookie("token", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 60 * 60 * 1000,
    });
    successResponse(
      res,
      "User Login Successfully",
      { _id: user._id, email: user.email ,role:user.role},
      {},
      userToken
    );
  } catch (error) {
    next(error);
  }
};
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user){
      const error= new Error("User not found");
      error.statusCode = 404;
      throw error;
    } 
    const otp = uuidv4().slice(0, 6);
    const otpExpiresAt = Date.now() + 5 * 60 * 1000;
    await sendEmail(email, otp);
    const hashedOTP = await bcrypt.hash(otp, 12);
    user.otp = hashedOTP;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();
    successResponse(res, "OTP send successfully");
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password)
      throw new Error("Email & OTP & new password are required");
    const user = await User.findOne({ email });
    if (!user){
      const error= new Error("User not found");
      error.statusCode = 404;
      throw error;
    } 
    if (Date.now() > user.otpExpiresAt) throw new Error("OTP Expired");
    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch){
      const error= new Error("Invalid OTP");
      error.statusCode = 401;
      throw error;
    } 
    if (password.length < 8)
      throw new Error("Password must be at least 8 characters");
    const hashedPassword = await bcrypt.hash(password, 14);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();
    successResponse(res, "Password Resets Successfully");
  } catch (error) {
    next(error);
  }
};
const logout = (req, res,next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    successResponse(res,"Logged out successfully");
    
  } catch (error) {
    next(error);
  }
};

export { signUp, login, forgotPassword, resetPassword ,logout};
