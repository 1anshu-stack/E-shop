import { Router } from "express";
import * as authController from "../controllers/auth.controller"

const router = Router();


router.post("/profile", authController.setProfile)


export default router;