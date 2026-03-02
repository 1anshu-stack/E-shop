import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";



export const addToCart = asyncHandler(
  async(req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;
    const {productId, quantity} = req.body;


  }
)