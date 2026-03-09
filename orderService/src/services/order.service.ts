import prisma from '../config/prisma';
import { redis } from '../config/redis';
import axios from 'axios';

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  categoryId: string;
  createdAt: string;
};

type ProductResponse = {
  success: string;
  message: string;
  data: Product[];
};

export const createService = async (userId: string) => {
  const cartKey = `cart:${userId}`;
  console.log('cartKey', cartKey);

  const cartItems = await redis.hgetall(cartKey);
  console.log('cartItems', cartItems);

  if (!cartItems || Object.keys(cartItems).length === 0) {
    throw new Error('Cart empty');
  }

  const productIds = Object.keys(cartItems);

  return prisma.$transaction(async (tx) => {
    // Fetch products from product service
    const { data: products } = await axios.post<ProductResponse>(
      'http://localhost:4003/products/getProductById',
      {
        productIds,
      }
    );

    // TotalAmount
    let totalAmount: number = 0;
    for (const product of products.data) {
      const quantity = JSON.parse(cartItems[product.id]).quantity;
      console.log(quantity);
      if (product.stock < quantity) {
        throw new Error(`Product ${product.id} out of stock`);
      }

      totalAmount += Number(product.price) * quantity;
    }

    // Create Order
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount
      }
    })

    // Create order items
    for (const product of products.data){
      const quantity = JSON.parse(cartItems[product.id]).quantity;
      const orderItem = await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId : product.id,
          quantity,
          price: Number(product.price)
        }
      })
        
      // Decrease stock
      
    }

  });
};
