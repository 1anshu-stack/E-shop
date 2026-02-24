import {Request, Response} from "express";
import * as productService from "../services/product.service"



/**
 * createProduct controller
 * @param req 
 * @param res 
 */
export const createProduct = async(req: Request, res: Response) => {
  const result = await productService.createService(req.body);
  res.status(201).json({
    success: true,
    message: result
  })
}


/**
 * getAllProduct controller
 * @param req 
 * @param res 
 */
export const getAllProduct = async(req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const cursor = req.query.cursor ? req.query.cursor as string : undefined;

  const result = await productService.getProductService(limit, cursor);
  res.status(404).json({
    success: true,
    message: result
  });
}