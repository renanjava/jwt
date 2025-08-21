import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Product } from '../utils/product.type';
import { Type } from 'class-transformer';

class CreateProductDto implements Product {
  @IsString()
  @IsNotEmpty()
  externalId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1000)
  price: number;
}

export class CreateBillingDto {
  @ValidateNested()
  @Type(() => CreateProductDto)
  product: CreateProductDto;
}
