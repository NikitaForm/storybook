import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as models from '../../domain/models';
import { aircrafts } from '../../aircraft-list/aircrafts';

@Component({
  selector: `aircraft-list-card`,
  templateUrl: `./aircraft-list.component.html`,
  styleUrls: ['./aircraft-list.component.scss']
})
export class AircraftListCardComponent {

  @Output() onSelect = new EventEmitter();

  public aircrafts: any[] = aircrafts.slice(0, 10);
  getStatus(a): string {
    if (a.deleted) {
      return 'Inactive';
    }
    if (!a.completed) {
      return 'Incomplete';
    }
    return 'Active';
  }

  getInsuranceStatus(a): string {
    if (!a.insuranceApproved || !this.isInsuranceValidAtDeparture(a.insuranceExpirationDate, new Date())) {
      return 'Insurance Expired';
    }
    return 'Insurance Valid';
  }

  isInsuranceValidAtDeparture(ins: Date, departure: Date): boolean {
    const serializesIns = new Date(ins);
    if (serializesIns === null) {
      return false;
    }
    if (!departure) {
      return true;
    }
    serializesIns.setHours(0, 0, 0, 0);

    return departure < serializesIns;
  }

}
