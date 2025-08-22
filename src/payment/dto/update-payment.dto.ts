import { $Enums } from '@prisma/client';

export class UpdatePaymentDto {
  status: $Enums.PaymentStatus;
  paid_amount: number;
  paid_date: Date;
}
