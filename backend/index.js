// const express=require("express")  // old method
import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectdb from "./utils/db.js"
import userRoute from "./routes/user.route.js"

dotenv.config({})
const app=express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const coroptions={
    origin:"http://localhost:5173",
    crendentials:true,
}
app.use(cors(coroptions));

const PORT=process.env.PORT || 3000;

//API's
app.use("/api/v1/user",userRoute)

// 'http://localhost:8000/api/v1/user/register'
// 'http://localhost:8000/api/v1/user/login'
// 'http://localhost:8000/api/v1/user/profile/update'



app.listen(PORT,()=>{
    connectdb()
    console.log(`server running on port ${PORT}`);
})