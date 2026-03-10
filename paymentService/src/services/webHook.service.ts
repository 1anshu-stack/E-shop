import { prisma } from "../config/prisma";


export const webHookService = async (event: string, paymentId: string, orderId: string) => {
  let result;

  if(event == "payment.captured"){
    result = await prisma.payment.update({
      where: {
        razorpayOrderId: orderId 
      },
      data: {
        razorpayPaymentId: paymentId,
        status: "SUCCESS"
      }
    })
  }

  if(event == "payment.failed"){
    result = await prisma.payment.update({
      where: {
        razorpayOrderId: orderId 
      },
      data: {
        status: "FAILED"
      }
    })
  }

  return result;
}