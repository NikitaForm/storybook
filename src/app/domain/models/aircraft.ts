import { AircraftModel } from './aircraft-model';

export class Aircraft {
  aircraftId: number;
  aircraftModel: AircraftModel;
  tailNumber: string;
  marketableSeatsCount: number;
  insuranceExpirationDate: Date = null;
  insuranceApproved = false;
  deleted: boolean;
  completed: boolean;
}
