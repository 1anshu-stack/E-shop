import { Router } from "express";
import { validate } from "../middleware/validation.middleware";
import { createProductSchema, getProductsQuerySchema } from "../validation/product.validation";
import * as productController from "../controllers/product.controller"


const router = Router();

/**
 * create Product
 */
router.post(
  "/create",
  validate(createProductSchema),
  productController.createProduct
)


/**
 * get Products
 */
router.get(
  '/getAllproduct',
  validate(getProductsQuerySchema),
  productController.getAllProduct
)


export default router;