import Users from '../models/user.js'
export const getAllUsers = async(req,res)=>{
    const users = await Users.find({});
    console.log(req.query);
    res.json({
        success: true,
        users,
    });
};

export const singleId = async(req,res)=>{
    const user = await Users.findById(req.params.id);
    res.json({
        success: true,
        user,
    });
};

export const register = async(req,res)=>{

    const {name,email,password} = req.body;



    const users = await Users.create({
        name,
        email,
        password
    });

    res.status(201).cookie("tempi","lul").json({
        success: true,
        message:"hogya bhai signup",
    });
};