import { Router } from "express";
import * as productController from "../controllers/product.controller"
import { validate } from "../middleware/validation.middleware";
import { createProductSchema } from "../validation/product.validation";


const router = Router();

router.post(
  "/create",
  validate(createProductSchema),
  productController.createProduct
)


export default router;