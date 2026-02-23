import {Request, Response} from "express";
import * as productService from "../services/product.service"


export const createProduct = async(req: Request, res: Response) => {
  const result = await productService.createService(req.body);
  res.status(201).json({
    success: true,
    message: result
  })
}