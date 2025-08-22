import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-bill/:id')
  async createBill(@Param('id') productId: string, @Req() req: any) {
    return await this.paymentService.createBilling(req.user.userId, productId);
  }

  @Get()
  async findAllBills() {
    return await this.paymentService.findAllBills();
  }

  @Get(':external_id')
  async findByExternalId(@Param('external_id') externalId: string) {
    return await this.paymentService.findByExternalId(externalId);
  }

  @Post('web-hook')
  async webHookCallBack(@Body() payload: any) {
    return await this.paymentService.handleWebHook(payload);
  }
}
