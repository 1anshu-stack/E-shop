import {Request, Response} from "express";
import * as authService from "../services/auth.service"
import { asyncHandler } from "../utils/asyncHandler";



export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await authService.register(req.body.email, req.body.password);
    res.status(200).json({
      success: true,
      data: user
    });
  }
);



export const login = asyncHandler(
  async (req: Request, res:Response) => {
    const user = await authService.login(req.body.email, req.body.password);
    res.status(201).json({
      success: true,
      data: user
    });
  }
)