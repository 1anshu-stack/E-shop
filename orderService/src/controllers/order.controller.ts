import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as serviceOrder from "../services/order.service"


export const create = asyncHandler(
  async (req: Request, res: Response) => {
    // const {userId} = JSON.parse(req.headers("x-user-id") as string)

    const {userId} = req.body;
    const result = await serviceOrder.createService(userId);

    res.status(200).json({
      success: true,
      message: "order created",
      data: result
    })
  }
) 