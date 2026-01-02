import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { VehicleService } from './vehicle.service';
import {
  VehicleBaseResponseDto,
  VehicleFeatureDto,
  VehicleHistoryDto,
  VehicleInspectionDto,
  VehicleMediaDto,
  VehicleReviewDto,
  VehicleSpecDto,
} from './dto/vehicle.dto';

@ApiTags('Vehicles')
@Controller({ path: 'vehicles', version: '1' })
export class VehiclesController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get(':id')
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: VehicleBaseResponseDto })
  public async getVehicle(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<VehicleBaseResponseDto> {
    return this.vehicleService.getVehicleById(id);
  }

  @Get(':id/media')
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: VehicleMediaDto, isArray: true })
  public async getVehicleMedia(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<VehicleMediaDto[]> {
    return this.vehicleService.getVehicleMedia(id);
  }

  @Get(':id/specs')
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: VehicleSpecDto, isArray: true })
  public async getVehicleSpecs(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<VehicleSpecDto[]> {
    return this.vehicleService.getVehicleSpecs(id);
  }

  @Get(':id/features')
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: VehicleFeatureDto, isArray: true })
  public async getVehicleFeatures(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<VehicleFeatureDto[]> {
    return this.vehicleService.getVehicleFeatures(id);
  }

  @Get(':id/history')
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: VehicleHistoryDto })
  public async getVehicleHistory(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<VehicleHistoryDto | null> {
    return this.vehicleService.getVehicleHistory(id);
  }

  @Get(':id/inspection')
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: VehicleInspectionDto })
  public async getVehicleInspection(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<VehicleInspectionDto | null> {
    return this.vehicleService.getVehicleInspection(id);
  }

  @Get(':id/reviews')
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: VehicleReviewDto, isArray: true })
  public async getVehicleReviews(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<VehicleReviewDto[]> {
    return this.vehicleService.getVehicleReviews(id);
  }
}
