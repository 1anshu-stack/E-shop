import { Request, Response, NextFunction } from "express";

import crypto from "crypto";

export const verifyWebHook = async (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

  const signature = req.headers["x-razorpay-signature"];

  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expectedSignature === signature) {
    next();
  } else {
    return res.status(400).send("Invalid signature");
  }
}