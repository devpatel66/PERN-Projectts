import { Router } from "express";
import { simpleRequest, simpleRequest2 } from "../controller/simple.js";

const router = Router();

router.route("/simple").get(simpleRequest)
router.route("/smp").get(simpleRequest2)

export default router

