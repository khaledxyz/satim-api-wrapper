import { z } from 'zod';

export const JsonParamsSchema = z.object({
  force_terminal_id: z.string().max(16),
  udf1: z.string().max(20),
  udf2: z.string().max(20).optional(),
  udf3: z.string().max(20).optional(),
  udf4: z.string().max(20).optional(),
  udf5: z.string().max(20).optional(),
});

export const ParamsSchema = z.object({
  respCode_desc: z.string(),
  respCode: z.string()
})

export const orderRegistrationSchema = z.object({
  userName: z.string().max(30),
  password: z.string().max(30),
  orderNumber: z.string().max(10),
  amount: z.number().min(50, "Minimum amount is 50 DA").refine(
    (amount) => amount % 100 === 0,
    {
      message: "Amount must be a multiple of 100",
      path: ['amount']
    }
  ),
  returnUrl: z.string().url().max(512),
  failUrl: z.string().url().max(512).optional(),
  description: z.string().max(512).optional(),
  language: z.union([z.literal('AR'), z.literal('FR'), z.literal('EN')]),
  jsonParams: JsonParamsSchema
});

export const orderRegistrationResponseSchema = z.object({
  orderId: z.string().length(20).optional(),
  formUrl: z.string().max(512).url().optional(),
  errorCode: z.string().optional(),
  errorMessage: z.string().optional(),
});

export const orderConfirmationSchema = z.object({
  userName: z.string().max(30),
  password: z.string().max(30),
  orderId: z.string().length(20),
  language: z.union([z.literal('AR'), z.literal('FR'), z.literal('EN')])
});

export const orderConfirmationResponseSchema = z.object({
  OrderStatus: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(5), z.literal(6), z.literal(7)]).optional(),
  ErrorCode: z.string().optional(),
  errorMessage: z.string().max(512).optional(),
  OrderNumber: z.string().max(20),
  actionCode: z.number(),
  actionCodeDescription: z.string().max(512),
  Pan: z.string().max(19).optional(),
  expiration: z.string().max(6).optional(),
  cardholderName: z.string().max(20).optional(),
  amount: z.number(),
  currency: z.number().optional(),
  approvalCode: z.string().max(6).optional(),
  authCode: z.number().optional(),
  params: ParamsSchema,
  ip: z.string().max(20).optional(),
  clientId: z.string().max(255).optional(),
  bindingId: z.string().max(255).optional(),
});

export const orderRefundSchema = z.object({
  userName: z.string().max(30),
  password: z.string().max(30),
  orderId: z.string().length(20),
  amount: z.number().min(50, "Minimum amount is 50 DA").refine(
    (amount) => amount % 100 === 0,
    {
      message: "Amount must be a multiple of 100",
      path: ['amount']
    }
  ),
});
