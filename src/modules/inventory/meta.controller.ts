import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { MetaService } from './meta.service';
import {
  EnumValueDto,
  MakeResponseDto,
  MetaModelQueryDto,
  ModelResponseDto,
} from './dto/meta.dto';

@ApiTags('Meta')
@Controller({ path: 'meta', version: '1' })
export class MetaController {
  constructor(private readonly metaService: MetaService) {}

  @Get('makes')
  @ApiOkResponse({ type: MakeResponseDto, isArray: true })
  public async listMakes(): Promise<MakeResponseDto[]> {
    return this.metaService.listMakes();
  }

  @Get('models')
  @ApiOkResponse({ type: ModelResponseDto, isArray: true })
  public async listModels(
    @Query() query: MetaModelQueryDto,
  ): Promise<ModelResponseDto[]> {
    return this.metaService.listModels(query.makeId);
  }

  @Get('body-types')
  @ApiOkResponse({ type: EnumValueDto, isArray: true })
  public listBodyTypes(): EnumValueDto[] {
    return this.metaService.listBodyTypes();
  }

  @Get('transmissions')
  @ApiOkResponse({ type: EnumValueDto, isArray: true })
  public listTransmissions(): EnumValueDto[] {
    return this.metaService.listTransmissions();
  }
}
