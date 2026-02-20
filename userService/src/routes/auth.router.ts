import { Router } from "express";
import * as authController from "../controllers/auth.controller"
import { validate } from "../middlewares/validate.middleware";
import { createProfileSchema } from "../validators/user.validator";
import { verifyToken } from "../middlewares/auth.middleware";


const router = Router();


router.post(
  "/profile", 
  validate(createProfileSchema),
  verifyToken,
  authController.setProfile
)


export default router;