import {prisma} from "../config/prisma"

interface ProfileValues {
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
}

export const profileSave = (id: string, values: ProfileValues) => {
  // console.log("inside service layer", id, values);

  return prisma.userProfile.create({
    data: {
      userId: id,
      ...values
    }
  })
}