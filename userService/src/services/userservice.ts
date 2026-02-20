import {prisma} from "../config/prisma"

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
      ...values
    }
  })
}


/**
 * get user info from the database
 * @param userId 
 */
export const profileGet = async (userId: string) => {
  const userInfo = await prisma.userProfile.findUnique({
    where: {
      userId
    }
  })

  return userInfo;
}