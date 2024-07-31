import { User } from "../models/user.model.js";
import bycrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register=async (req,res)=>{
    try {
        const{fullname,email,mobilenumber,password,address}=req.body;
        if(!fullname || !email || !mobilenumber || !password || !address){
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }

        const user=await User.findOne({email})

        if(user){
            return res.status(400).json({
                message:"users already exists with the email",
                success:false
            })
        }

        const hashedpassword= await bycrypt.hash(password,10)

        await User.create({
            fullname,
            email,
            mobilenumber,
            password:hashedpassword,
            address

        })

        return res.status(201).json({
            message:"account created successfully",
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const login=async(req,res)=>{
    try {
        const{email,password}=req.body
        if( !email || !password ){
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }

        let user=await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }

        const ispaswordmatch= await bycrypt.compare(password,user.password)

        if(!ispaswordmatch){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }

        const tokendata={
            userid:user._id
        }

        const token=await jwt.sign(tokendata,process.env.SECRET_KEY,{expiresIn:'1d'})

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            mobilenumber:user.mobilenumber,


        }



        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:"strict"}).json({
            message:`welcome back ${user.fullname} `,
            user,
            success:true
        })




    } catch (error) {
        console.log(error);
        
    }


    
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, mobilenumber } = req.body;
        

       
        

        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(mobilenumber)  user.mobilenumber = mobilenumber
        
      
        


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
           mobilenumber: user.mobilenumber,
           
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
