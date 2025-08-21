import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateBillingDto } from './dto/create-billing.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-bill')
  async createBill(
    @Body() createBillingDto: CreateBillingDto,
    @Req() req: any,
  ) {
    return await this.paymentService.createBilling(
      createBillingDto,
      req.user.userId,
    );
  }

  @Get()
  async findAllBills() {
    return await this.paymentService.findAllBills();
  }
}
