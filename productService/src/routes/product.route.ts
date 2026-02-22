import { Router } from "express";
import * as productController from "../controllers/product.controller"


const router = Router();

router.post(
  "/create",
  productController.createProduct
)


export default router;