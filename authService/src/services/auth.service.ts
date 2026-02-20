import {prisma} from "../lib/prisma"
import {hashPassword, comparePassword} from "../utils/hash"
import { BadRequest, Unauthorized } from "../utils/httpErrors";
import {
  generateAccessToken, 
  generateRefreshToken,
  hashRefreshToken,
  getRefreshTokenExpiry
} from '../utils/token'



/**
 * register service
 * @param email 
 * @param password 
 * @returns 
 */
export const register = async (email: string, password: string) => {
  const existingUser = await prisma.userAuth.findUnique({
    where: {email}
  });

  if(existingUser){
    throw BadRequest("Email is already registered");
  }

  const hashed = await hashPassword(password);

  return prisma.userAuth.create({
    data: {
      email, 
      passwordHash: hashed,
      role: "USER"
    }
  })
}


/**
 * Login service
 * @param email 
 * @param password 
 * @returns 
 */
export const login = async (email: string, password: string) => {
  const userInfo = await prisma.userAuth.findUnique({
    where: {email}
  })

  if(!userInfo){
    throw Unauthorized("Invalid Email or Password");
  }

  // console.log("userInfo", userInfo);

  const isPasswordValid = await comparePassword(password, userInfo.passwordHash);

  if (!isPasswordValid) {
    throw Unauthorized("Invalid Email or Password");
  }

  // generate access Token
  const accessToken = generateAccessToken({
    sub: userInfo.id,
    role: userInfo.role
  })

  // generate Refresh token
  const refreshToken = generateRefreshToken();
  const refreshTokenHash = hashRefreshToken(refreshToken);

  // store refresh token
  await prisma.refreshToken.create({
    data: {
      tokenHash: refreshTokenHash,
      userId: userInfo.id,
      expiresAt: getRefreshTokenExpiry()
    }
  })

  return {
    accessToken,
    refreshToken,
    user: {
      id: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
    },
  };
}


/**
 * 
 * @param refreshToken 
 * @returns 
 */
export const refreshAccessToken = async(refreshToken: string) => {
  if (!refreshToken) {
    throw Unauthorized("Refresh token missing");
  }

  // hash incoming token 
  const tokenHash = hashRefreshToken(refreshToken);
  // console.log("tokenHash", tokenHash);

  // find token in db
  const storedToken = await prisma.refreshToken.findFirst({
    where: { tokenHash: tokenHash },
    include: { user: true },
  });

  // console.log("storedToken", storedToken);

  if (!storedToken) {
    throw Unauthorized("Invalid refresh token");
  }

  if(storedToken.expiresAt < new Date()){
    // delete refresh token
    await prisma.refreshToken.delete({
      where: {id: storedToken.id}
    })

    throw Unauthorized("Refresh token expired");
  }

  const user = storedToken.user;

  // new access token generate
  const newAccessToken = generateAccessToken({
    sub: user.id,
    role: user.role,
  });

  // ROTATE REFRESH TOKEN
  await prisma.refreshToken.delete({
    where: { id: storedToken.id },
  });

  // generate refresh token
  const newRefreshToken = generateRefreshToken();
  const newHashRefreshToken = hashRefreshToken(newRefreshToken);

  await prisma.refreshToken.create({
    data: {
      tokenHash: newHashRefreshToken,
      userId: user.id,
      expiresAt: getRefreshTokenExpiry()
    }
  })

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}



/**
 * 
 * @param refreshToken 
 * @returns 
 */
export const logout = async(refreshToken: string) => {
  if(!refreshToken){
    throw Unauthorized("Refresh token missing");
  }

  // hash a refreshToken
  const hashToken = hashRefreshToken(refreshToken);

  // find the refresh token by hash
  const tokenToDelete = await prisma.refreshToken.findFirst({
    where: { tokenHash: hashToken },
  });

  if (!tokenToDelete) {
    throw Unauthorized("Refresh token not found");
  }

  // delete the refresh token by id
  await prisma.refreshToken.delete({
    where: { id: tokenToDelete.id },
  });


  return { message: "Logged out successfully" };
}


/**
 * 
 * @param id 
 */
export const getSingleUser = async(id: string) => {
  
  const userDetail = await prisma.userAuth.findUnique({
    where: {
      id
    },
    select: {
      email: true,
      role: true,
      isActive: true
    }
  })

  return userDetail;
}