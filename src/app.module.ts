import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, PaymentModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
