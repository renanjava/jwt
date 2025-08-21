import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import AbacatePay from 'abacatepay-nodejs-sdk';
import { PaymentRepository } from './payment.repository';
import {
  CreateBillingData,
  CreateCustomerData,
} from 'abacatepay-nodejs-sdk/dist/types';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UserRepository } from 'src/user/user.repository';
import { cpf } from 'cpf-cnpj-validator';

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

    if (!cpf.isValid(user.cpf)) {
      throw new BadRequestException(
        'cpf inválido para continuar o processamento',
      );
    }

    const customer: CreateCustomerData = {
      email: user.email,
      name: user.name,
      cellphone: user.phone,
      taxId: user.cpf,
    };

    console.log(customer);

    const billing: CreateBillingData = {
      frequency: 'ONE_TIME',
      methods: ['PIX'],
      products: [createBillingDto.product],
      returnUrl: 'https://yoursite.com/app',
      completionUrl: 'https://yoursite.com/payment/success',
      customer,
    };

    console.log({ customer });
    console.log({ billing });

    const response = await this.paymentProvider.billing.create(billing);

    console.log(response);

    if (!response.data) {
      throw new BadRequestException('Input inválido');
    }

    if (response.error === null) {
      console.log('Pagamento criado com sucesso!');
    }

    return response;
  }

  async findAllBills() {
    const response = await this.paymentProvider.billing.list();
    console.log(response);

    return response;
  }
}
