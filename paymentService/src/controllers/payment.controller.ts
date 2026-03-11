import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import * as paymentService from "../services/payment.service";


export const createPaymentController = asyncHandler(
  async (req: Request, res: Response) => {
    const {orderId, userId, amount} = req.body;
    const result = await paymentService.createPayment(orderId, userId, amount);

    res.status(200).json({
      status: true,
      message: "Payment create but in pending state",
      data: result
    })
  }
)