import { Payment } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Payment[]> {
    return await this.prismaService.payment.findMany();
  }

  async findById(id: string): Promise<Payment> {
    return await this.prismaService.payment.findUniqueOrThrow({
      where: { id },
    });
  }

  async create(payment: CreatePaymentDto): Promise<Payment> {
    return await this.prismaService.payment.create({ data: payment });
  }

  async remove(id: string): Promise<Payment> {
    return await this.prismaService.payment.delete({ where: { id } });
  }
}
