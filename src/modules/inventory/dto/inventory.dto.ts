import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { BodyType, Transmission } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export enum InventorySort {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  YEAR_ASC = 'year_asc',
  YEAR_DESC = 'year_desc',
  MILEAGE_ASC = 'mileage_asc',
  MILEAGE_DESC = 'mileage_desc',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class InventoryQueryDto {
  @ApiPropertyOptional({ description: 'Search query', example: 'Tesla' })
  @IsOptional()
  @IsString()
  public readonly q?: string;

  @ApiPropertyOptional({ description: 'Filter by make (id or name)' })
  @IsOptional()
  @IsString()
  public readonly make?: string;

  @ApiPropertyOptional({ description: 'Filter by model (id or name)' })
  @IsOptional()
  @IsString()
  public readonly model?: string;

  @ApiPropertyOptional({ example: 10000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  public readonly priceMin?: number;

  @ApiPropertyOptional({ example: 50000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  public readonly priceMax?: number;

  @ApiPropertyOptional({ example: 2015 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public readonly yearMin?: number;

  @ApiPropertyOptional({ example: 2024 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public readonly yearMax?: number;

  @ApiPropertyOptional({ enum: BodyType })
  @IsOptional()
  @IsEnum(BodyType)
  public readonly bodyType?: BodyType;

  @ApiPropertyOptional({ enum: Transmission })
  @IsOptional()
  @IsEnum(Transmission)
  public readonly transmission?: Transmission;

  @ApiPropertyOptional({ enum: InventorySort })
  @IsOptional()
  @IsEnum(InventorySort)
  public readonly sort?: InventorySort;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public readonly page?: number;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  public readonly limit?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined ? undefined : value === 'true' || value === true,
  )
  @IsBoolean()
  public readonly certified?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined ? undefined : value === 'true' || value === true,
  )
  @IsBoolean()
  public readonly featured?: boolean;
}

export class MakeSummaryDto {
  @ApiProperty({ example: '9d7b0e1b-9d13-41a6-9d50-6c4a1e5b7f25' })
  public readonly id: string;

  @ApiProperty({ example: 'Tesla' })
  public readonly name: string;
}

export class ModelSummaryDto {
  @ApiProperty({ example: 'f3b2b51b-7ed2-4d09-98ab-c3323b8c4b46' })
  public readonly id: string;

  @ApiProperty({ example: 'Model 3' })
  public readonly name: string;
}

export class InventoryVehicleDto {
  @ApiProperty({ example: '1d5f0d2f-6b5b-4b61-82e6-60c4f4c4c5b1' })
  public readonly id: string;

  @ApiPropertyOptional({ example: '5YJ3E1EA7JF000001' })
  public readonly vin?: string | null;

  @ApiPropertyOptional({ example: 'STK-12345' })
  public readonly stockNumber?: string | null;

  @ApiProperty({ example: 2023 })
  public readonly year: number;

  @ApiPropertyOptional({ example: 'Performance' })
  public readonly trim?: string | null;

  @ApiProperty({ enum: BodyType })
  public readonly bodyType: BodyType;

  @ApiProperty({ enum: Transmission })
  public readonly transmission: Transmission;

  @ApiProperty({ example: 12000 })
  public readonly mileage: number;

  @ApiProperty({ example: 38999.99 })
  public readonly price: Decimal;

  @ApiPropertyOptional({ example: 42999.99 })
  public readonly msrp?: Decimal | null;

  @ApiProperty({ example: 'USD' })
  public readonly currency: string;

  @ApiProperty({ example: true })
  public readonly featured: boolean;

  @ApiProperty({ example: false })
  public readonly certified: boolean;

  @ApiProperty({ type: MakeSummaryDto })
  public readonly make: MakeSummaryDto;

  @ApiProperty({ type: ModelSummaryDto })
  public readonly model: ModelSummaryDto;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/vehicle.jpg' })
  public readonly coverImageUrl?: string | null;
}

export class InventoryListResponseDto {
  @ApiProperty({ type: InventoryVehicleDto, isArray: true })
  public readonly items: InventoryVehicleDto[];

  @ApiProperty({ example: 1 })
  public readonly page: number;

  @ApiProperty({ example: 12 })
  public readonly limit: number;

  @ApiProperty({ example: 120 })
  public readonly total: number;

  @ApiProperty({ example: true })
  public readonly hasNext: boolean;

  @ApiProperty({ example: false })
  public readonly hasPrev: boolean;
}
