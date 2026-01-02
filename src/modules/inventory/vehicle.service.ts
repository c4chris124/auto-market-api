import { Injectable, NotFoundException } from '@nestjs/common';

import { VehicleRepository } from './repositories/vehicle.repository';
import {
  VehicleBaseResponseDto,
  VehicleFeatureDto,
  VehicleHistoryDto,
  VehicleInspectionDto,
  VehicleMediaDto,
  VehicleReviewDto,
  VehicleSpecDto,
} from './dto/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  public async getVehicleById(id: string): Promise<VehicleBaseResponseDto> {
    const vehicle = await this.vehicleRepository.findBaseById(id);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  public async getVehicleMedia(id: string): Promise<VehicleMediaDto[]> {
    await this.assertVehicleExists(id);
    return this.vehicleRepository.listMedia(id);
  }

  public async getVehicleSpecs(id: string): Promise<VehicleSpecDto[]> {
    await this.assertVehicleExists(id);
    return this.vehicleRepository.listSpecs(id);
  }

  public async getVehicleFeatures(id: string): Promise<VehicleFeatureDto[]> {
    await this.assertVehicleExists(id);
    return this.vehicleRepository.listFeatures(id);
  }

  public async getVehicleHistory(
    id: string,
  ): Promise<VehicleHistoryDto | null> {
    await this.assertVehicleExists(id);
    return this.vehicleRepository.getHistory(id);
  }

  public async getVehicleInspection(
    id: string,
  ): Promise<VehicleInspectionDto | null> {
    await this.assertVehicleExists(id);
    return this.vehicleRepository.getInspection(id);
  }

  public async getVehicleReviews(id: string): Promise<VehicleReviewDto[]> {
    await this.assertVehicleExists(id);
    return this.vehicleRepository.listReviews(id);
  }

  private async assertVehicleExists(id: string): Promise<void> {
    const exists = await this.vehicleRepository.existsById(id);
    if (!exists) {
      throw new NotFoundException('Vehicle not found');
    }
  }
}
