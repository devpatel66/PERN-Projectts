import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const createWallet = asyncHandler(async (req,res)=>{
    const user = req.user;
    const {amount} = req.body
    console.log(amount)
    if(!user){
        return res.status(501).json(
            new ApiResponse(501,"Cannot fetch user details")
        )
    }
    
    if(amount < 0){
        return res.status(402).json(
            new ApiResponse(402,"Amount cannot be less than 0")
        )
    }

    const existingWallet = await prisma.wallet.findFirst({
        where:{
            userId : user.id
        }
    })

    if(existingWallet){
        return res.status(403).json(
            new ApiResponse(403,"Wallet already exists")
        )
    }

    const wallet = await prisma.wallet.create({
        data:{
            userId:user.id,
            amount:amount
        }
    })

    if(!wallet){
        return res.status(502).json(
            new ApiResponse(502,"Internal Error while creating wallet")
        )
    }

    return res.status(200).json(
        new ApiResponse(200,"Wallet Created Successfully",wallet)
    )
})

const addAmount = asyncHandler(async(req,res)=>{
    const {amount} = req.body;
    const {id} = req.user;

    if(amount < 100){
        return res.status(401).json(
            new ApiResponse(401,"Amount must be more than 100")
        )
    }

    const wallet = await prisma.wallet.findFirst({
        where:{
            userId:id
        }
    })

    if(!wallet){
        return res.status(401).json(
            new ApiResponse(401,"Wallet does not exits, create a new wallet")
        )
    }

    const updateAmountWallet = await prisma.wallet.update({
        where :{
            id : wallet.id
        },
        data:{
            amount : wallet.amount + amount
        }
    })

    if(!updateAmountWallet){
        return res.status(501).json(
            new ApiResponse(501,"Internal Server Error")
        )
    }

    return res.status(200).json(
        new ApiResponse(200,"Amount added into wallet sccessfully",updateAmountWallet)
    )
})


const decductAmt =  asyncHandler(async(req,res)=>{
    const {amt,walletId} = req.body
    console.log("wallet :",walletId," Amt : ",amt)
    if(!amt){
        return res.status(401).json(
            new ApiResponse(401,"Amount cannot be empty")
        )
    }
    if(!walletId){
        return res.status(401).json(
            new ApiResponse(401,"Wallet  Id is required")
        )
    }

    const wallet = await prisma.wallet.findFirst({
        where:{
            id:walletId
        }
    })

    if(!wallet){
        return res.status(401).json(
            new ApiResponse(401,"Wallet does not exists")
        )
    }

    if(wallet.amount < amt){
        return res.status(401).json(
            new ApiResponse(401,"Insufficent Amount in the Wallet")
        )
    }

    const updatedWallet = await prisma.wallet.update({
        where:{
            id:walletId
        },
        data:{
            amount : wallet.amount - amt
        }
    })

    if(!updatedWallet){
        return res.status(501).json(
            new ApiResponse(501,"Can't Update the Wallet || Internal Server Error")
        )
    }

    return res.status(501).json(
        new ApiResponse(200,"Amount deducted Successfully",updatedWallet)
    )
})

const getWalletInfo = asyncHandler(async(req,res)=>{
    const {id} = req.user
    console.log(id)
    if(!id){
        return res.status(401).json(
            new ApiResponse(401,"Unauthorized User")
        )
    }

    const userwallet = await prisma.wallet.findFirst({
        where:{
            userId:id
        }
    })

    console.log(userwallet)
    if(!userwallet){
        return res.status(401).json(
            new ApiResponse(401,"Wallet not found")
        )
    }

    return  res.status(200).json(
        new ApiResponse(200,"Wallet fetch successfully",userwallet)
    )
})

export {
    createWallet,
    addAmount,
    decductAmt,
    getWalletInfo
}