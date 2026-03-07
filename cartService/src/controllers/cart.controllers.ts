import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as CartService from "../services/addToCart.service";


/**
 * Add to cart controller
 */
export const addToCart = asyncHandler(
  async(req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;
    const {productId, quantity} = req.body;

    const result = await CartService.addToCartService(productId, quantity, userId);

    return res.status(200).json({
      message: "item add to cart",
      item: result
    })
  }
)


/**
 * Get cart controller
 */
export const getFromCart = asyncHandler(
  async(req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;

    const result = await CartService.getFromCart(userId);

    res.status(201).json({
      message: "Cart Deatils",
      item: result
    })
  }
)


/**
 * remove item from cart controller
 */
export const removeItemFromCart = asyncHandler(
  async(req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;
    const {productId} = req.body;

    const result = await CartService.removeItem(userId, productId);

    res.status(201).json({
      message: result
    })
  }
)


/**
 * clear cart controller
 */
export const clearCart = asyncHandler(
  async(req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;

    const result = await CartService.clearCart(userId);

    res.status(201).json({
      message: result
    })
  }
)