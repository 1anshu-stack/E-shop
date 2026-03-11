import { Router } from "express";
import {verifyWebHook} from "../middlewares/verifyWebhook";

import * as paymentController from "../controllers/payment.controller";
import * as webHookController from "../controllers/webhook.controller";


const router = Router();

router.post(
  '/checkout',
  paymentController.createPaymentController
)


router.post(
  '/webhook',
  verifyWebHook,
  webHookController.razorpayWebHook
)

export default router;