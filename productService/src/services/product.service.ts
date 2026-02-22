import {prisma} from "../db/db";


import { ProductCreateInput } from "../generated/prisma/models/Product";

export const createService = async (productData: ProductCreateInput) => {
  const result = await prisma.product.create({ data: productData });
  return result;
}