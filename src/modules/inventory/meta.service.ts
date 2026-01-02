import { Injectable } from '@nestjs/common';

import { BodyType, Transmission } from '@prisma/client';

import { MetaRepository } from './repositories/meta.repository';

@Injectable()
export class MetaService {
  constructor(private readonly metaRepository: MetaRepository) {}

  public listMakes() {
    return this.metaRepository.listMakes();
  }

  public listModels(makeId?: string) {
    return this.metaRepository.listModels(makeId);
  }

  public listBodyTypes() {
    return Object.values(BodyType).map((value) => ({ value }));
  }

  public listTransmissions() {
    return Object.values(Transmission).map((value) => ({ value }));
  }
}
