import jwt from "jsonwebtoken";
import crypto from "crypto";

const ACCESS_TOKEN_TTL = "15m";        // short-lived
const REFRESH_TOKEN_TTL_DAYS = 7;       // long-lived

/**
 * Access token
 * @param payload 
 * @returns 
 */
export const generateAccessToken = (payload: {
  sub: string;
  role: string;
}) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: ACCESS_TOKEN_TTL,
  });
};


/**
 * Refresh Token
 * @returns 
 */
export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const hashRefreshToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const getRefreshTokenExpiry = () => {
  const expires = new Date();
  expires.setDate(expires.getDate() + REFRESH_TOKEN_TTL_DAYS);
  return expires;
};
