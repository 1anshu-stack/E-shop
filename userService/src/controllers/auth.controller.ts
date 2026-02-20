import { Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import * as userService from "../services/userservice"
import { Unauthorized } from "../utils/httpError";



export const setProfile = asyncHandler(
  async (req: Request, res: Response) => {
    // console.log("request", req.user);
    // console.log("requesbody", req.body);
    if (!req.user || !req.user.sub) {
      throw Unauthorized("Unauthorized");
    }

    const profile = await userService.profileSave(
      req.user.sub,
      req.body
    )

    res.status(200).json({
      success: true,
      data: profile
    })
  }
)