import veriifyJwt from "../middleware/authMiddleware.js";
import { Router } from "express";
import {addAmount, createWallet, decductAmt, getWalletInfo} from '../controller/walletController.js'
const walletRouter = Router();

walletRouter.route("/createWallet").post(veriifyJwt,createWallet)
walletRouter.route("/addAmount").post(veriifyJwt,addAmount)
walletRouter.route("/deductAmt").post(veriifyJwt,decductAmt)
walletRouter.route("/getWalletInfo").get(veriifyJwt,getWalletInfo)

export default walletRouter