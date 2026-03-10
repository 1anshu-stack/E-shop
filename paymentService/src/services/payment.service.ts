import { prisma } from "../config/prisma";
import { razorpay } from "../config/razorpay";


export const createPayment = async(
  orderId: string,
  userId: string,
  amount: number
) => {
  const razorpayOrder = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: orderId
  })

  const payment = await prisma.payment.create({
    data: {
      orderId,
      userId,
      amount,
      razorpayOrderId: razorpayOrder.id,
      status: "PENDING"
    }
  })

  return {
    payment,
    razorpayOrder
  }
}