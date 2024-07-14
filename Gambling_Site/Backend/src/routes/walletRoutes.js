import veriifyJwt from "../middleware/authMiddleware.js";
import { Router } from "express";
import {addAmount, createWallet} from '../controller/walletController.js'
const walletRouter = Router();

walletRouter.route("/createWallet").post(veriifyJwt,createWallet)
walletRouter.route("/addAmount").post(veriifyJwt,addAmount)

export default walletRouter