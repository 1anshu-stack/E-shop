import {Request, Response} from "express";
import * as authService from "../services/auth.service"
import { asyncHandler } from "../utils/asyncHandler";
import { BadRequest } from "../utils/httpErrors";


/**
 * Register controller
 */
export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await authService.register(req.body.email, req.body.password);
    res.status(200).json({
      success: true,
      data: user
    });
  }
);


/**
 * Login controller
 */
export const login = asyncHandler(
  async (req: Request, res:Response) => {
    const user = await authService.login(
      req.body.email, 
      req.body.password
    );
    
    res.status(201).json({
      success: true,
      data: user
    });
  }
)


/**
 * Refresh controller
 */
export const refreshToken = asyncHandler(
  async(req: Request, res: Response) => {
    const {refreshToken} = req.body;

    const result = await authService.refreshAccessToken(refreshToken);

    res.status(200).json(result)
  }
) 


/**
 * logout controller
 */
export const logout = asyncHandler(
  async(req: Request, res: Response) => {
    const { refreshToken } = req.body;

    await authService.logout(refreshToken);
  
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }
)