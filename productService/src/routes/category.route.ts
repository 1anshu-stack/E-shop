import { Router } from "express";
import {categorySchema} from "../validation/category.validation"
import { validate } from "../middleware/validation.middleware";
import * as categoryController from "../controllers/category.controller"


const router = Router();


router.post(
  "/create",
  validate(categorySchema),
  categoryController.createCategoryController
)


export default router;