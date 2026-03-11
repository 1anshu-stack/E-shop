import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as webHookServiceLayer from "../services/webHook.service";


export const razorpayWebHook = asyncHandler (
  async (req: Request, res: Response) => {
    const event = req.body.event;
    const paymentId = req.body.payload.payment.entity.id;
    const orderId = req.body.payload.payment.entity.order_id;

    const result = await webHookServiceLayer.webHookService(event, paymentId, orderId);

    res.status(201).json({
      success: true,
      Message: "Payment success or failed",
      data: result
    })
  }
)

