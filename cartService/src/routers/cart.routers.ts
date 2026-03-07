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


/**
 * get from cart router
 */
router.get(
  '/getCartItems',
  CartController.getFromCart
)


/**
 * remove Item from cart router
 */
router.delete(
  '/deleteCartItem',
  CartController.removeItemFromCart
)


/**
 * Clear Cart
 */
router.delete(
  '/clearCart',
  CartController.clearCart
)

export default router;