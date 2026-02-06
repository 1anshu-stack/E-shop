import { PrismaClient } from "../generated/prisma/client";
import {hashPassword, comparePassword} from "../utils/hash"
import { BadRequest, Unauthorized } from "../utils/httpErrors";
import {generateAccessToken, generateRefreshToken} from '../utils/token'

const prisma = new PrismaClient();



export const register = async (email: string, password: string) => {
  const existingUser = await prisma.userAuth.findUnique({
    where: {email}
  });

  if(existingUser){
    throw BadRequest("Email is already registered");
  }

  const hashed = await hashPassword(password);

  return prisma.userAuth.create({
    data: {email, passwordHash: hashed}
  })
}


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

  const {
    passwordHash: _,
    ...safeUser
  } = userInfo;

  return safeUser;
}

