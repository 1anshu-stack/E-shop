import {prisma} from "../db/db";

import {CategoryCreateInput} from "../generated/prisma/models/Category"

export const createCategoryService = async (categoryName: CategoryCreateInput) => {
  const result = await prisma.category.create({
    data: { 
      name: categoryName.name 
    }
  })

  return result
}