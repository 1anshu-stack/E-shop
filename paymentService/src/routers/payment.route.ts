import { Router } from "express";
import * as paymentController from "../controllers/payment.controller"

const router = Router();

router.post(
  '/checkout',
  paymentController.checkout
)


export default router;