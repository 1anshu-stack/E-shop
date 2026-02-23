import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as categoryService from "../services/category.service"



export const createCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await categoryService.createCategoryService(req.body);
    res.status(201).json({
      success: true,
      message: result
    })
  }
)