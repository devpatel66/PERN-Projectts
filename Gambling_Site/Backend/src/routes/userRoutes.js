import { Router } from "express";
import { registerUser,updateUser,loginUser } from "../controller/userController.js";
const router = Router()

router.route("/register").post(registerUser)
router.route("/update").post(updateUser)
router.route("/login").post(loginUser)

export default router