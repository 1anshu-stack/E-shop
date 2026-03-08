import { Router } from "express";
import * as orderController from "../controllers/order.controller"

const router = Router();


/**
 * create order router
 */
router.post(
  '/create',
  orderController.create
)


export default router;