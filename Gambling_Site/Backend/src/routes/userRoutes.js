import { Router } from "express";
import { registerUser,updateUser,loginUser, logout } from "../controller/userController.js";
import veriifyJwt from "../middleware/authMiddleware.js";
const router = Router()

router.route("/register").post(registerUser)
router.route("/update").post(updateUser)
router.route("/login").post(loginUser)
router.route("/logout").post(veriifyJwt,logout)

export default router