import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import * as models from '../models';
import { FormGroup } from '@angular/forms';

export interface IAirportService {
  getValidator(callback: AirportValidatorDelegate, controlName: String): ValidatorFunction;
}

export const SERVICE_TOKEN = new InjectionToken('Flights.IAirportService');

type AirportValidatorDelegate = (airport: models.Airport) => void;
type ValidatorFunction = (control: FormGroup) => Promise<any>;
