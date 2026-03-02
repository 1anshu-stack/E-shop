import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { addToCartService } from "../services/addToCart.service";



export const addToCart = asyncHandler(
  async(req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;
    const {productId, quantity} = req.body;

    const result = await addToCartService(productId, quantity, userId);

    return res.status(201).json({
      message: "item add to cart",
      item: result
    })
  }
)