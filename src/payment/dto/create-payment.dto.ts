import { $Enums } from '@prisma/client';

export class CreatePaymentDto {
  status: $Enums.PaymentStatus;
  payment_url: string;
  payment_fee: number;
  return_url: string;
  success_url: string;
  method: string;
  dev_mode: boolean;
  product_id: string;
}
