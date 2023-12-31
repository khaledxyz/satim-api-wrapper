import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { TOrderConfirmationBody, TOrderConfirmationResponse, TOrderRegistrationBody, TOrderRegistrationResponse } from 'src/types/satim';
import { throwError } from './lib/throw-error';
import { objectToQuery } from './lib/object-to-query';
import { orderConfirmationSchema, orderRegistrationSchema } from './zod/satim';
import { ORDER_REGISTRATION_URL, ORDER_CONFIRMATION_URL, ORDER_REFUND_URL } from './config';

export type { BaseOptions } from 'src/types/satim';

export const registerOrder = async <T>(options: TOrderRegistrationBody): Promise<TOrderRegistrationResponse<T>> => {
  try {
    orderRegistrationSchema.parse(options);

    const base = `${ORDER_REGISTRATION_URL}?${objectToQuery(options)}&currency=012`;

    const url =
      process.env.NODE_ENV?.toLowerCase() === 'development' ||
        process.env.NODE_ENV?.toLowerCase() === 'dev' ||
        options.dev ? base : base.replace('test.', '');

    options.dev = undefined;
    const response: AxiosResponse<T> = await axios.get(url);

    return response.data as TOrderRegistrationResponse<T>;
  } catch (error: unknown) {
    throwError(error)
  }
};

export const confirmOrder = async <T>(options: TOrderConfirmationBody): Promise<TOrderConfirmationResponse<T>> => {
  try {
    orderConfirmationSchema.parse(options);

    const base = `${ORDER_CONFIRMATION_URL}?${objectToQuery(options)}`;
    const url =
      process.env.NODE_ENV?.toLowerCase() === 'development' ||
        process.env.NODE_ENV?.toLowerCase() === 'dev' ||
        options.dev ? base : base.replace('test.', '');

    options.dev = undefined;
    const response: AxiosResponse<T> = await axios.get(url);

    return response.data as TOrderConfirmationResponse<T>;
  } catch (error) {
    throwError(error)
  }
};

export const refundOrder = async <T>(options: TOrderConfirmationBody): Promise<TOrderConfirmationResponse<T>> => {
  try {
    orderConfirmationSchema.parse(options);

    const base = `${ORDER_REFUND_URL}?${objectToQuery(options)}`;
    const url =
      process.env.NODE_ENV?.toLowerCase() === 'development' ||
        process.env.NODE_ENV?.toLowerCase() === 'dev' ||
        options.dev ? base : base.replace('test.', '');

    options.dev = undefined;
    const response: AxiosResponse<T> = await axios.get(url);

    return response.data as TOrderConfirmationResponse<T>;
  } catch (error) {
    throwError(error)
  }
};
