import { Router } from "express";
import * as authController from "../controllers/auth.controller"
import { validate } from "../middlewares/validate.middleware";
import { createProfileSchema } from "../validators/user.validator";


const router = Router();


router.post(
  "/profile", 
  validate(createProfileSchema),
  authController.setProfile
)


export default router;