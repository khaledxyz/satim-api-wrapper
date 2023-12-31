import { z } from 'zod';

import type {
  orderRegistrationSchema,
  orderRegistrationResponseSchema,
  orderConfirmationSchema,
  orderConfirmationResponseSchema,
} from 'src/zod/satim';

export interface BaseOptions {
  dev?: boolean
  [key: string]: unknown;
}

export type TOrderRegistrationBody = z.infer<typeof orderRegistrationSchema> & BaseOptions;
export type TOrderRegistrationResponse<T> = z.infer<typeof orderRegistrationResponseSchema> & T & BaseOptions;
export type TOrderConfirmationBody = z.infer<typeof orderConfirmationSchema> & BaseOptions;
export type TOrderConfirmationResponse<T> = z.infer<typeof orderConfirmationResponseSchema> & T & BaseOptions;
