import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { aircrafts } from '../aircrafts-data';

@Component({
  selector: `aircraft-list-card`,
  templateUrl: `./aircraft-list.component.html`,
  styleUrls: ['./aircraft-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AircraftListCardComponent {

  @Output() onSelect = new EventEmitter();
  @Input() viewMode = 'cardView';

  public aircrafts: any[] = aircrafts;

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

  rowCallback(context) {
    if (context.dataItem.deleted || !context.dataItem.completed) {
      return 'inactive';
    }
  }

}
