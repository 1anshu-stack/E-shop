import { Router } from "express";
import * as authController from "../controllers/user.controller"
import { validate } from "../middlewares/validate.middleware";
import { createProfileSchema } from "../validators/user.validator";
import { verifyToken } from "../middlewares/auth.middleware";


const router = Router();


/**
 * post a user profile details
 */
router.post(
  "/profile", 
  validate(createProfileSchema),
  verifyToken,
  authController.setProfile
)


/**
 * get a user profile details
 */
router.get(
  "/profile",
  verifyToken,
  authController.getProfile
)

export default router;