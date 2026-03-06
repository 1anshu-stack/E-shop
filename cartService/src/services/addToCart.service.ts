import { redis } from "../services/redis.services";
import { Unauthorized } from "../utils/httpErrorcode";

const CART_TTL = 60 * 60 * 24; // 24 hours;

export const addToCartService = async (productId: string, quantity: number, userId: string) => {
  if(!userId){
    throw Unauthorized("Unauthorized user");
  }

  const key = `cart:${userId}`;

  const existingItem = await redis.hget(key, productId);

  let updatedQuanitiy = quantity;

  if(existingItem){
    const parsed = JSON.parse(existingItem);
    updatedQuanitiy = parsed.quantity + quantity;
  }

  // todo
  const cartItem = {
    productId, 
    title: product.title,
    price: product.price,
    quantity: updatedQuanitiy
  }

  await redis.hset(key, productId, JSON.stringify(cartItem));
  await redis.expire(key, CART_TTL);

  return cartItem;
}


export const getFromCart = async (userId: string) => {
  if(!userId){
    throw Unauthorized("Unauthorized user");
  }

  const key = `cart:${userId}`;

  const items = await redis.hgetall(key);

  const paredItem = Object.values(items).map(item => JSON.parse(item))  

  return paredItem;
}


export const removeItem = async (userId: string, productId: string){
  if(!userId){
    throw Unauthorized("Unauthorized user");
  }

  const key = `cart:${userId}`;

  await redis.hdel(key, productId);

  return "Item Removed"
}


export const clearCart = async (userId: string) => {
  if(!userId){
    throw Unauthorized("Unauthorized user");
  }

  const key = `cart:${userId}`;

  await redis.del(key);

  return "Cart cleared";
};
