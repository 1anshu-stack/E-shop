import { prisma } from '../config/prisma';
import axios from 'axios';

interface ProfileValues {
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
}

/**
 * save profile info into database
 * @param id
 * @param values
 * @returns
 */
export const profileSave = (id: string, values: ProfileValues) => {
  // console.log("inside service layer", id, values);

  return prisma.userProfile.create({
    data: {
      userId: id,
      ...values,
    },
  });
};

/**
 * get user info from the database
 * @param userId
 */
export const profileGet = async (userId: string, token: string) => {

  const userInfo = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });

  if(!userInfo) return null;

  const authInto = await axios.get(
    `http://localhost:4001/auth/internal/user/${userId}`,
    {
      headers: {
        "authorization": `Bearer ${token}`
      }
    }
  )

  if(!authInto) return null;

  Object.assign(userInfo, authInto.data);

  return {
    userInfo
  };
};
