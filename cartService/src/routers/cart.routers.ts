import { Router } from "express";
import * as CartController from "../controllers/cart.controllers";


const router = Router();

/**
 * create cart router
 */
router.post(
  '/create',
  CartController.addToCart
)