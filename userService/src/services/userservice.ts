import {prisma} from "../config/prisma"

export const profileSave = (userId: string, data: string[]) => {
  return prisma.UserProfile.create({
    data: {
      userId,
      ...data
    }
  })
}