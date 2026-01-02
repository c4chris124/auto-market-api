import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { BodyType } from '@prisma/client';

export class MetaModelQueryDto {
  @ApiPropertyOptional({
    description: 'Filter models by makeId',
    example: '9d7b0e1b-9d13-41a6-9d50-6c4a1e5b7f25',
  })
  @IsOptional()
  @IsString()
  public readonly makeId?: string;
}

export class MakeResponseDto {
  @ApiProperty({ example: '9d7b0e1b-9d13-41a6-9d50-6c4a1e5b7f25' })
  public readonly id: string;

  @ApiProperty({ example: 'Tesla' })
  public readonly name: string;
}

export class ModelResponseDto {
  @ApiProperty({ example: 'f3b2b51b-7ed2-4d09-98ab-c3323b8c4b46' })
  public readonly id: string;

  @ApiProperty({ example: 'Model 3' })
  public readonly name: string;

  @ApiProperty({ example: '9d7b0e1b-9d13-41a6-9d50-6c4a1e5b7f25' })
  public readonly makeId: string;
}

export class EnumValueDto {
  @ApiProperty({ example: BodyType.SEDAN })
  public readonly value: string;
}
