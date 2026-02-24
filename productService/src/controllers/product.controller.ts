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
  const {
    limit,
    cursor,
    categoryId,
    minPrice,
    maxPrice,
    inStock
  } = {
    limit: parseInt(req.query.limit as string, 10),
    cursor: req.query.cursor ? req.query.cursor as string : undefined,
    categoryId: req.query.categoryId as string,
    minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
    maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
    inStock: req.query.inStock ? req.query.inStock === 'true' : undefined
  }

  const result = await productService.getProductService(
    limit, 
    cursor,
    categoryId,
    minPrice,
    maxPrice,
    inStock
  );

  res.status(404).json({
    success: true,
    message: result
  });
}