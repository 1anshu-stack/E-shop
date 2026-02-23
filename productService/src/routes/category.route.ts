import { Router } from "express";
import * as categoryController from "../controllers/category.controller"


const router = Router();


router.post(
  "/create",
  categoryController.createCategoryController
)


export default router;