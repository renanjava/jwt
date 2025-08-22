import { Payment } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

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

  async findByExternalId(externalId: string): Promise<Payment | null> {
    return await this.prismaService.payment.findUnique({
      where: { external_id: externalId },
    });
  }

  async update(
    externalId: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    return await this.prismaService.payment.update({
      where: { external_id: externalId },
      data: updatePaymentDto,
    });
  }

  async create(payment: CreatePaymentDto): Promise<Payment> {
    return await this.prismaService.payment.create({ data: payment });
  }

  async remove(id: string): Promise<Payment> {
    return await this.prismaService.payment.delete({ where: { id } });
  }
}
