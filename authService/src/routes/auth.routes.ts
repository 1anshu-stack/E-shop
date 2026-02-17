import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import {loginSchema, registerSchema} from "../validations/auth.validator"
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post(
  "/register", 
  validate(registerSchema),
  authController.register
);


router.post(
  "/login", 
  validate(loginSchema),
  authController.login
);


router.post(
  "/refresh",
)

export default router;