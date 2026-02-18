import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import {loginSchema, registerSchema} from "../validations/auth.validator"
import * as authController from "../controllers/auth.controller";

const router = Router();

/**
 * register router
 */
router.post(
  "/register", 
  validate(registerSchema),
  authController.register
);



/**
 * login router
 */
router.post(
  "/login", 
  validate(loginSchema),
  authController.login
);



/**
 * refresh router
 */
router.post(
  "/refresh",
  authController.refreshToken
)



/**
 * logout router
 */
router.post(
  "/logout",
  authController.logout
)
export default router;