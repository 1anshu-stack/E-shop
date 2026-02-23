import { Router } from "express";
import {categorySchema} from "../validation/category.validation"
import * as categoryController from "../controllers/category.controller"
import { validate } from "../middleware/validation.middleware";


const router = Router();


router.post(
  "/create",
  validate(categorySchema),
  categoryController.createCategoryController
)


export default router;