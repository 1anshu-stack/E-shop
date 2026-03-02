import { redis } from "../services/redis.services";

const CART_TTL = 60 * 60 * 24; // 24 hours;

export const addToCartService = async (productId: string, quantity: number, userId: string) => {
  if(!userId){
  }

  const key = `cart:${userId}`;

  const existingItem = await redis.hget(key, productId);

  let updatedQuanitiy = quantity;

  if(existingItem){
    const parsed = JSON.parse(existingItem);
    updatedQuanitiy = parsed.quantity + quantity;
  }

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