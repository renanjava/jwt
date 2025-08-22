import { Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return await this.prismaService.product.findMany();
  }

  async create(product: CreateProductDto): Promise<Product> {
    return await this.prismaService.product.create({ data: product });
  }

  async findById(id: string): Promise<Product> {
    return await this.prismaService.product.findUniqueOrThrow({
      where: { id },
    });
  }
}
