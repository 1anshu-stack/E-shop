import jwt from "jsonwebtoken";

const generateAccessToken = (payload: object) => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if(!secret){
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }
  jwt.sign(payload, secret, {expiresIn: "15m"})
}

const generateRefreshToken = (payload: object) => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }
  jwt.sign(payload, secret, {expiresIn: "7d"});
}

export {
  generateAccessToken, 
  generateRefreshToken
}