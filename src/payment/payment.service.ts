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
import { UserRepository } from 'src/user/user.repository';
import { cpf } from 'cpf-cnpj-validator';
import { ProductRepository } from 'src/product/product.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('ABACATEPAY')
    private readonly paymentProvider: ReturnType<typeof AbacatePay>,
    private readonly paymentRepository: PaymentRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async createBilling(userId: number, productId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('usuário nao encontrado');
    }

    if (!cpf.isValid(user.cpf)) {
      throw new BadRequestException(
        'cpf inválido para continuar o processamento',
      );
    }

    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('produto nao encontrado');
    }

    const productInput = {
      externalId: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };

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
      products: [productInput],
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

      const paymentPayload: CreatePaymentDto = {
        method: response.data.methods[0],
        dev_mode: response.data.devMode,
        payment_fee: response.data.metadata.fee,
        product_id: productId,
        status: response.data.status,
        payment_url: response.data.url,
        return_url: response.data.metadata.returnUrl,
        success_url: response.data.metadata.completionUrl,
      };

      await this.paymentRepository.create(paymentPayload);
    }

    return response;
  }

  async findAllBills() {
    const response = await this.paymentProvider.billing.list();
    console.log(response);

    return response;
  }
}
