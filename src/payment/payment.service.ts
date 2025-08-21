import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import AbacatePay from 'abacatepay-nodejs-sdk';
import { PaymentRepository } from './payment.repository';
import {
  CreateBillingData,
  CreateCustomerData,
} from 'abacatepay-nodejs-sdk/dist/types';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('ABACATEPAY')
    private readonly paymentProvider: ReturnType<typeof AbacatePay>,
    private readonly paymentRepository: PaymentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createBilling(createBillingDto: CreateBillingDto, userId: number) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('usuário nao encontrado');
    }

    const customer: CreateCustomerData = {
      email: user.email,
      name: user.name,
      cellphone: '12345',
      taxId: String(user.id),
    };

    const billing: CreateBillingData = {
      frequency: 'ONE_TIME',
      methods: ['PIX'],
      products: [
        {
          externalId: '123',
          name: 'reserva chacara teste',
          quantity: 1,
          price: 4500,
        },
      ],
      returnUrl: 'https://yoursite.com/app',
      completionUrl: 'https://yoursite.com/payment/success',
      customer: {
        email: user.email,
        name: user.name,
        cellphone: '12345',
        taxId: String(user.id),
      },
    };

    console.log({ customer });
    console.log({ billing });

    const response = await this.paymentProvider.billing.create({
      frequency: 'ONE_TIME',
      methods: ['PIX'],
      products: [
        {
          externalId: 'PRO-PLAN',
          name: 'Pro plan',
          quantity: 1,
          price: 1000, // Amount in cents
        },
      ],
      returnUrl: 'https://yoursite.com/app',
      completionUrl: 'https://yoursite.com/payment/success',
      customer: {
        name: 'Customer Name',
        email: 'customer@example.com',
        cellphone: '+5511999999999',
        taxId: '09240529020',
      },
    });

    console.log(response);

    return response;
  }

  async findAllBills() {
    const response = await this.paymentProvider.billing.list();
    console.log(response);

    return response;
  }
}
