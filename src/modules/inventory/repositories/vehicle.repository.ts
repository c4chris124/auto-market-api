import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { DatabaseService } from '@database/database.service';
import { PrismaRepository } from '@database/prisma/prisma.repository';

@Injectable()
export class VehicleRepository extends PrismaRepository {
  private readonly baseSelect = {
    id: true,
    vin: true,
    stockNumber: true,
    year: true,
    trim: true,
    bodyType: true,
    transmission: true,
    fuelType: true,
    drivetrain: true,
    mileage: true,
    doors: true,
    seats: true,
    exteriorColor: true,
    interiorColor: true,
    description: true,
    price: true,
    msrp: true,
    currency: true,
    status: true,
    featured: true,
    certified: true,
    createdAt: true,
    updatedAt: true,
    make: {
      select: {
        id: true,
        name: true,
      },
    },
    model: {
      select: {
        id: true,
        name: true,
      },
    },
  } satisfies Prisma.VehicleSelect;

  constructor(databaseService: DatabaseService) {
    super(databaseService);
  }

  public findBaseById(id: string) {
    return this.prisma.vehicle.findUnique({
      where: { id },
      select: this.baseSelect,
    });
  }

  public async existsById(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      select: { id: true },
    });

    return Boolean(vehicle);
  }

  public listMedia(vehicleId: string) {
    return this.prisma.vehicleMedia.findMany({
      where: { vehicleId },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        type: true,
        url: true,
        altText: true,
        sortOrder: true,
        createdAt: true,
      },
    });
  }

  public listSpecs(vehicleId: string) {
    return this.prisma.vehicleSpec.findMany({
      where: { vehicleId },
      orderBy: { key: 'asc' },
      select: {
        key: true,
        value: true,
        unit: true,
      },
    });
  }

  public listFeatures(vehicleId: string) {
    return this.prisma.vehicleFeature.findMany({
      where: { vehicleId },
      orderBy: { label: 'asc' },
      select: {
        label: true,
      },
    });
  }

  public getHistory(vehicleId: string) {
    return this.prisma.vehicleHistory.findUnique({
      where: { vehicleId },
      select: {
        ownersCount: true,
        accidentsCount: true,
        serviceRecordsAvailable: true,
        reportUrl: true,
        lastReportedAt: true,
        notes: true,
      },
    });
  }

  public getInspection(vehicleId: string) {
    return this.prisma.vehicleInspection.findUnique({
      where: { vehicleId },
      select: {
        inspectedAt: true,
        passed: true,
        score: true,
        notes: true,
      },
    });
  }

  public listReviews(vehicleId: string) {
    return this.prisma.vehicleReview.findMany({
      where: { vehicleId },
      orderBy: { createdAt: 'desc' },
      select: {
        rating: true,
        title: true,
        comment: true,
        authorName: true,
        createdAt: true,
      },
    });
  }
}
