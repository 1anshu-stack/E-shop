import {prisma} from "../db/db";


import { ProductCreateInput } from "../generated/prisma/models/Product";


/**
 * Create product
 * @param productData 
 * @returns 
 */
export const createService = async (productData: ProductCreateInput) => {
  const result = await prisma.product.create({ data: productData });
  return result;
}


/**
 * Get all Product
 * @param limit 
 * @param cursor 
 * @param categoryId 
 * @param minPrice 
 * @param maxPrice 
 * @param inStock 
 * @returns 
 */
export const getProductService = async (
  limit:number = 10, 
  cursor: string | undefined,
  categoryId: string | undefined,
  minPrice: number | undefined,
  maxPrice: number | undefined,
  inStock: boolean | undefined
) => {
  const products = await prisma.product.findMany({
    take: limit + 1,
    cursor: cursor ? {id: cursor} : undefined,
    skip : cursor ? 1 : 0,
    where: {
      categoryId: categoryId,
      price: {
        gte: minPrice ?? undefined,
        lte: maxPrice ?? undefined
      },
      stock: inStock ? { gt: 0 } : undefined
    },

    orderBy: [
      {
        createdAt: "desc"
      },
      {
        id: "desc"
      }
    ]
  })

  const hasNextPage = products.length > limit;
  if(hasNextPage){
    products.pop();
  }

  return {
    data: products,
    nextCursor: hasNextPage ? products[products.length - 1].id : null,
    hasNextPage
  }
}


/**
 * 
 * @param productIds 
 * @returns 
 */
export const getProductById = async (productIds: string[]) => {
  const data = await prisma.product.findMany({
    where: {
      id : {
        in: productIds
      }
    }
  })

  return data;
}



/**
 * update product service
 * @param id 
 * @param data 
 * @returns 
 */
export const updateProduct = async (
  id: string, 
  data: {
    name? : string,
    description? : string,
    price? : number,
    stock? : number
  }) => {
    // console.log("ID:", `"${id}"`)
    const product = await prisma.product.findFirst({
      where: {id}
    })
  
    if (!product) {
      throw new Error("Product not found")
    }

    const result = await prisma.product.update({
      where: {id},
      data
    })

    return result;
  }