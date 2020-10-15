import { ServiceClassEnum } from '../../../../shared/models/service-class-enum';
import { AircraftCategory } from './aircraft-category';

import * as _ from 'lodash';

export class Aircraft {
  aircraftId: number;
  serviceClass: ServiceClassEnum;
  category: AircraftCategory;
  modelName: string;
  tailNumber: string;
  marketableSeatsCount: number;
  insuranceExpirationDate: Date = null;
  insuranceApproved = false;

  getInsuranceApproved(): boolean {
    return this.insuranceApproved;
  }

  setInsuranceApproved(insuranceApproved: boolean): Aircraft {
    this.insuranceApproved = insuranceApproved;
    return this;
  }

  getInsuranceExpiration(): Date {
    return this.insuranceExpirationDate;
  }

  setInsuranceExpiration(insuranceExpirationDate: Date): Aircraft {
    this.insuranceExpirationDate = insuranceExpirationDate;
    return this;
  }

  getCategory(): AircraftCategory {
    return this.category;
  }

  setCategory(category: AircraftCategory): Aircraft {
    this.category = category;
    return this;
  }

  getServiceClass(): ServiceClassEnum {
    return this.serviceClass;
  }

  setServiceClass(serviceClass: ServiceClassEnum): Aircraft {
    this.serviceClass = serviceClass;
    return this;
  }

  getAircraftId(): number {
    return this.aircraftId;
  }

  setAircraftId(aircraftId: number): Aircraft {
    this.aircraftId = aircraftId;
    return this;
  }

  getModelName(): string {
    return this.modelName;
  }

  setModelName(modelName: string): Aircraft {
    this.modelName = modelName;
    return this;
  }

  getTailNumber(): string {
    return this.tailNumber;
  }

  setTailNumber(tailNumber: string): Aircraft {
    this.tailNumber = tailNumber;
    return this;
  }

  getMarketableSeatsCount(): number {
    return this.marketableSeatsCount;
  }

  setMarketableSeatsCount(marketableSeatsCount: number): Aircraft {
    this.marketableSeatsCount = marketableSeatsCount;
    return this;
  }
}
