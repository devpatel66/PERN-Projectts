import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { PrismaClient } from "@prisma/client";



const veriifyJwt = asyncHandler(async (req,res,next)=>{
    const prisma = new PrismaClient();
    try {
        // console.log(req.body)   
        console.log(req.cookies);
        const token = req.cookies?.accessToken;
        if(token == ""){
            return res.status(401).json(
                new ApiResponse(401,"Unauthorized user")
            )
        }
    
        const decode = jwt.verify(token,"dev12");
        const user = await prisma.user.findFirst({
            where:{
                id:decode.id
            },
            select:{
                id:true,
                email:true,
                name:true,
                password:false,
                refreshToken:false
            }
        })
    
        if(!user){
            return res.status(401).json(
                new ApiResponse(401,"Unauthorized User")
            )
        }
    
        req.user = user;
        next()
    } 
    catch (error) {
        prisma.$disconnect();
        return res.status(500).json({
            statusCode : 500,
            msg:"Internal Server Error",
            errMsg:error.message
        })
    }
})

export default veriifyJwt