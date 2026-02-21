import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as userService from '../services/userservice';
import { Unauthorized } from '../utils/httpError';


/**
 * setProfile controller
 */
export const setProfile = asyncHandler(async (req: Request, res: Response) => {
  // console.log("header", req.headers["x-user"]);
  
  const userHeader = JSON.parse(req.headers["x-user"] as string);
  const {sub, role} = userHeader;
  if (!sub || !role) {
    throw Unauthorized('Unauthorized');
  }

  const profile = await userService.profileSave(sub, req.body);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

/**
 * getProfile controller
 */
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  // console.log("header", req.headers["x-user"]);
  const userHeader = JSON.parse(req.headers["x-user"] as string);
  const {sub, role} = userHeader;

  const result = await userService.profileGet(sub);
  
  res.status(200).json({
    success: true,
    data: result,
  });
});
