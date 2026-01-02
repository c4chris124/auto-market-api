import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  BodyType,
  Drivetrain,
  FuelType,
  MediaType,
  Transmission,
  VehicleStatus,
} from '@prisma/client';

import { Decimal } from '@prisma/client/runtime/library';
import { MakeSummaryDto, ModelSummaryDto } from './inventory.dto';

export class VehicleBaseResponseDto {
  @ApiProperty({ example: '1d5f0d2f-6b5b-4b61-82e6-60c4f4c4c5b1' })
  public readonly id: string;

  @ApiPropertyOptional({ example: '5YJ3E1EA7JF000001' })
  public readonly vin?: string | null;

  @ApiPropertyOptional({ example: 'STK-12345' })
  public readonly stockNumber?: string | null;

  @ApiProperty({ type: MakeSummaryDto })
  public readonly make: MakeSummaryDto;

  @ApiProperty({ type: ModelSummaryDto })
  public readonly model: ModelSummaryDto;

  @ApiProperty({ example: 2023 })
  public readonly year: number;

  @ApiPropertyOptional({ example: 'Performance' })
  public readonly trim?: string | null;

  @ApiProperty({ enum: BodyType })
  public readonly bodyType: BodyType;

  @ApiProperty({ enum: Transmission })
  public readonly transmission: Transmission;

  @ApiProperty({ enum: FuelType })
  public readonly fuelType: FuelType;

  @ApiProperty({ enum: Drivetrain })
  public readonly drivetrain: Drivetrain;

  @ApiProperty({ example: 12000 })
  public readonly mileage: number;

  @ApiPropertyOptional({ example: 4 })
  public readonly doors?: number | null;

  @ApiPropertyOptional({ example: 5 })
  public readonly seats?: number | null;

  @ApiPropertyOptional({ example: 'Pearl White' })
  public readonly exteriorColor?: string | null;

  @ApiPropertyOptional({ example: 'Black' })
  public readonly interiorColor?: string | null;

  @ApiPropertyOptional({ example: 'One-owner, clean history.' })
  public readonly description?: string | null;

  @ApiProperty({ example: 38999.99 })
  public readonly price: Decimal;

  @ApiPropertyOptional({ example: 42999.99 })
  public readonly msrp?: Decimal | null;

  @ApiProperty({ example: 'USD' })
  public readonly currency: string;

  @ApiProperty({ enum: VehicleStatus })
  public readonly status: VehicleStatus;

  @ApiProperty({ example: true })
  public readonly featured: boolean;

  @ApiProperty({ example: false })
  public readonly certified: boolean;

  @ApiProperty()
  public readonly createdAt: Date;

  @ApiProperty()
  public readonly updatedAt: Date;
}

export class VehicleMediaDto {
  @ApiProperty({ example: 'fc7ce2e6-7d9e-4c4f-9960-5c4db5b7f0f2' })
  public readonly id: string;

  @ApiProperty({ enum: MediaType })
  public readonly type: MediaType;

  @ApiProperty({ example: 'https://cdn.example.com/vehicle.jpg' })
  public readonly url: string;

  @ApiPropertyOptional({ example: 'Front view' })
  public readonly altText?: string | null;

  @ApiProperty({ example: 0 })
  public readonly sortOrder: number;

  @ApiProperty()
  public readonly createdAt: Date;
}

export class VehicleSpecDto {
  @ApiProperty({ example: 'engine' })
  public readonly key: string;

  @ApiProperty({ example: '2.0L Turbo' })
  public readonly value: string;

  @ApiPropertyOptional({ example: 'L' })
  public readonly unit?: string | null;
}

export class VehicleFeatureDto {
  @ApiProperty({ example: 'Heated seats' })
  public readonly label: string;
}

export class VehicleHistoryDto {
  @ApiPropertyOptional({ example: 1 })
  public readonly ownersCount?: number | null;

  @ApiPropertyOptional({ example: 0 })
  public readonly accidentsCount?: number | null;

  @ApiProperty({ example: true })
  public readonly serviceRecordsAvailable: boolean;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/report.pdf' })
  public readonly reportUrl?: string | null;

  @ApiPropertyOptional({ example: '2024-10-22T00:00:00.000Z' })
  public readonly lastReportedAt?: Date | null;

  @ApiPropertyOptional({ example: 'No issues reported.' })
  public readonly notes?: string | null;
}

export class VehicleInspectionDto {
  @ApiPropertyOptional({ example: '2024-10-22T00:00:00.000Z' })
  public readonly inspectedAt?: Date | null;

  @ApiProperty({ example: true })
  public readonly passed: boolean;

  @ApiPropertyOptional({ example: 95 })
  public readonly score?: number | null;

  @ApiPropertyOptional({ example: 'Passed 150-point inspection.' })
  public readonly notes?: string | null;
}

export class VehicleReviewDto {
  @ApiProperty({ example: 5 })
  public readonly rating: number;

  @ApiPropertyOptional({ example: 'Amazing ride' })
  public readonly title?: string | null;

  @ApiPropertyOptional({ example: 'Loved the experience.' })
  public readonly comment?: string | null;

  @ApiPropertyOptional({ example: 'Alex' })
  public readonly authorName?: string | null;

  @ApiProperty()
  public readonly createdAt: Date;
}
