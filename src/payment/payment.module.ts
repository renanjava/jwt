import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';
import { PaymentProvider } from './payment.provider';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, PaymentProvider],
})
export class PaymentModule {}
