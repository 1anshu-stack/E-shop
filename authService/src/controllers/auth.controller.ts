import {Request, Response} from "express";
import * as authService from "../services/auth.service"
import { asyncHandler } from "../utils/asyncHandler";



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
    const result = await authService.login(
      req.body.email, 
      req.body.password
    );

    const {accessToken, refreshToken, user} = result;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    
    res.status(201).json({
      success: true,
      data: {
        accessToken,
        user
      }
    });
  }
)


/**
 * Refresh controller
 */
export const refreshToken = asyncHandler(
  async(req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    const result = await authService.refreshAccessToken(refreshToken);

    const {
      accessToken,
      refreshToken: newRefreshToken
    } = result;

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      data: {accessToken}
    })
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