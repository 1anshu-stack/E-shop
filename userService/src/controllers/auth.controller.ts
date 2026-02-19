import { Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import * as userService from "../services/userservice"



export const setProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await userService.profileSave(
      req.user.id,
      req.body
    )

    res.status(200).json({
      success: true,
      data: profile
    })
  }
)