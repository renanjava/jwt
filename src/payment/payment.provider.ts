import AbacatePay from 'abacatepay-nodejs-sdk';

export const PaymentProvider = {
  provide: 'ABACATEPAY',
  useFactory: () => AbacatePay(process.env.PIX_API_KEY!),
};
