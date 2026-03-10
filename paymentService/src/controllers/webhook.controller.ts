import { Request, Response } from "express";
import {prisma} from "../config/prisma";
import { asyncHandler } from "../utils/asyncHandler";


export const razorpayWebHook = asyncHandler (
  async (req: Request, res: Response) => {
    const event = req.body.event;
    const paymentId = req.body.payload.payment.entity.id;
    const orderId = req.body.payload.payment.entity.order_id;
  }
)

