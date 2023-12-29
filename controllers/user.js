import Users from '../models/user.js';
import bcrypt from 'bcrypt';
import ErrorHandler from '../middlewares/error.js';
import { sendCookie } from '../utils/features.js';
export const getAllUsers = async(req,res)=>{};

export  const login = async(req,res,next)=>{
    try {
        const {email, password} = req.body;
    const user = await Users.findOne({email}).select("+password");

    if(!user)
    {
        return next(new ErrorHandler("Invalid Email or password",400));      
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch)
    {   
        return next(new ErrorHandler("Invalid Email or password",404));
    }

    sendCookie(user,res,`welcome ${user.name}`,201);
    } catch (error) {
        next(error);
    }
};

export const getMyProfile = (req,res)=>{
    
    res.status(200).json({
        success: true,
        user:req.user,
    });
};

export const register = async(req,res,next)=>{
    try {
        const {name,email,password} = req.body;
    let user = await Users.findOne({email});

    if(user)
        return next(new ErrorHandler("User Already exists",404));
    
    const hashedPassword = await bcrypt.hash(password,10);
    user = await Users.create({
        name,
        email,
        password:hashedPassword
    });

    sendCookie(user,res,"registed successfully",201);
    } catch (error) {
        next(error);
    }
};

export const logout = (req,res) => {
    res.status(200).cookie("token","",{ expires: parseInt(new Date(Date.now)) }).json({
        success: true,
        user: req.user,
    })
}
