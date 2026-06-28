import dotenv from "dotenv";
import {emailConfiguration} from "../config/nodemailer.js";
import nodemailer from "nodemailer";

dotenv.config();

const sendEmail =async (email,otp)=>{
    const transporter =nodemailer.createTransport(emailConfiguration);
    const mailOptions ={
        from: process.env.PORTAL_EMAIL,
        to: email,
        subject: "Password Reset Verification Code",
        text: `Hello,

                We received a request to reset your account password.

                Your verification code is:

                OTP: ${otp}

                This code is valid for 5 minutes.

                If you did not request a password reset, please ignore this email and your account will remain secure.

                Best regards,
                Ecommerce Website`
    }
    try {
        await transporter.sendMail(mailOptions);
        return `OTP sent to ${email} via email`;
    } catch (error) {
        throw `Error sending OTP to ${email} via email: ${error}`;
    }
};

export default sendEmail;