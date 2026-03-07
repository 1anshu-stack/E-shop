import { redis } from "../services/redis.services";
import { Unauthorized } from "../utils/httpErrorcode";

const CART_TTL = 60 * 60 * 24; // 24 hours;

interface CartItem {
  productId: string,
  quantity: number
}

/**
 * Add to cartService
 * @param productId 
 * @param quantity 
 * @param userId 
 * @returns 
 */
export const addToCartService = async (productId: string, quantity: number, userId: string) => {
  if(!userId){
    throw Unauthorized("Unauthorized user");
  }

  const key = `cart:${userId}`;
  console.log("key", key);

  const existingItem = await redis.hget(key, productId);

  let updatedQuanitiy: number = quantity;
  

  if(existingItem){
    const parsed : CartItem = JSON.parse(existingItem);
    updatedQuanitiy = Number(parsed.quantity) + Number(quantity);
  }
  
  // todo
  const cartItem : CartItem = {
    productId, 
    // title: product.title,
    // price: product.price,
    quantity: updatedQuanitiy
  }

  await redis.hset(key, productId, JSON.stringify(cartItem));
  await redis.expire(key, CART_TTL);

  return cartItem;
}


/**
 * Get From cart
 * @param userId 
 * @returns 
 */
export const getFromCart = async (userId: string) => {
  if(!userId){
    throw Unauthorized("Unauthorized user");
  }

  const key = `cart:${userId}`;
  console.log("key", key);

  const items = await redis.hgetall(key);

  const parseItem = Object.values(items).map(item => JSON.parse(item))  

  return parseItem;
}


/**
 * Remove From cart
 * @param userId 
 * @param productId 
 * @returns 
 */
export const removeItem = async (userId: string, productId: string) => {
  if(!userId){
    throw Unauthorized("Unauthorized user");
  }

  const key = `cart:${userId}`;
  console.log("key", key);

  await redis.hdel(key, productId);

  return "Item Removed"
}


/**
 * Clear Cart
 * @param userId 
 * @returns 
 */
export const clearCart = async (userId: string) => {
  if(!userId){
    throw Unauthorized("Unauthorized user");
  }

  const key = `cart:${userId}`;
  console.log("key", key);

  await redis.del(key);

  return "Cart cleared";
};
