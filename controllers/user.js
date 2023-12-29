import Users from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { sendCookie } from '../utils/features.js';
export const getAllUsers = async(req,res)=>{};

export  const login = async(req,res,next)=>{
    const {email, password} = req.body;
    const user = await Users.findOne({email}).select("+password");

    if(!user)
    {
        return res.status(404).json({
            success: false,
            message: "Invalid Email or password"
        });
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch)
    {
        return res.status(404).json({
            success: false,
            message: "Invalid Email or password"
        });
    }

    sendCookie(user,res,"Logged",201);
};

export const getMyProfile = (req,res)=>{
    
    res.status(200).json({
        success: true,
        user:req.user,
    });
};

export const register = async(req,res)=>{
    const {name,email,password} = req.body;
    let user = await Users.findOne({email});

    if(user)
        return res.status(404).json({
            success:false,
            message: "User Already exist"
        });
    
    const hashedPassword = await bcrypt.hash(password,10);
    user = await Users.create({
        name,
        email,
        password:hashedPassword
    });

    sendCookie(user,res,"registed successfully",201);
};
