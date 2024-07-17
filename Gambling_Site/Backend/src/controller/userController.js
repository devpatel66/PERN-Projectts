import asyncHandler from "../utils/asyncHandler.js"
import { PrismaClient } from "@prisma/client"
import { generatesAccessToken,generatesRefreshTToken } from "../utils/generatesTokens.js";
import ApiResponse from "../utils/ApiResponse.js";
import { decryptPassword, encryptPassword } from "../utils/hashPassword.js";

const prisma = new PrismaClient();
const cookieOptions = {
    httpOnly:true,
    secure:true
}

const registerUser=asyncHandler(async (req,res)=>{
    const {email,name,password} = req.body

    if(!email){
        return res.status(400).json({
            msg:"Email is required"
        })
    }

    if(!name){
        return res.status(400).json({
            msg:"Name is required"
        })
    }

    if(!password){
        return res.status(400).json({
            msg:"Password is required"
        })
    }

    if(password.length < 7){
        return res.status(400).json({
            msg:"Password length must be more than 7"
        })
    }

    const encryptedPassword = await encryptPassword(password);

    const userAlreadyExists = await prisma.user.findFirst({
        where :{
            email
        }
    })

    if(userAlreadyExists){
        return res.status(401).json({
            msg:"user already exists"
        })
    }

    const user = await prisma.user.create({
        data:{
            "name":name,
            "email":email,
            "password":encryptedPassword
        }
    })

    if(!user){
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }

    return res.status(200).json({
        msg:"Data Inserted",
        user
    })

})

const updateUser=asyncHandler(async (req,res)=>{
    const {updateEmail,email,name,password} = req.body

    if(!email){
        return res.status(400).json({
            msg:"Email is requied"
        })
    }


    const user = await prisma.user.findFirst({
        where : {
            email
        }
    })

    
    if(!user){
        return res.status(401).json({
            msg:"User does not exists"
        })
    }

    const updatedUser = await prisma.user.update({
        where :{
            email
        },
        data : {
            name : name,
            password: password || user.password,
            email: updateEmail || email
        }
    })

    if(!updateUser){
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }

    return res.status(200).json({
        msg:"User Data updated",
        updatedUser
    })
})

const loginUser=asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email){
        return res.status(400).json(
            new ApiResponse(400,"Email is Required")
        )
    }
    if(!password){
        return res.status(400).json(
            new ApiResponse(400,"Password is Required")    
        )
    }

    const user = await prisma.user.findFirst({
        where:{
            email
        }
    })

    if(!user){
        return res.status(400).json(
            new ApiResponse(401,"User does not exists")
        )
    }

    const decryptedPassword = await decryptPassword(user.password,password);
    // console.log(decryptedPassword)
    if(decryptedPassword === false){
        return res.status(402).json(
            new ApiResponse(402,"Password is Incorrect")
        )
    }

    //generating access and refesh tokens
    const accessToken = await generatesAccessToken(user.id,user.name,user.email)
    const refeshToken = await generatesRefreshTToken(user.id)
    // console.log(refeshToken)

    //saving refesh token into the database
    const updateRefreshTokeninDB = await prisma.user.update({
        where : {
            id : user.id
        },
        data : {
            refreshToken : refeshToken
        },
        select:{
            refreshToken:true,
            email:true,
            name:true,
            wallet:true
        }
    })
    return res.status(200)
    .cookie("accessToken",accessToken,cookieOptions)
    .cookie("refreshToken",refeshToken,cookieOptions)
    .json(
        new ApiResponse(200,"Logged In",updateRefreshTokeninDB)
    )

})


export {registerUser,updateUser,loginUser}