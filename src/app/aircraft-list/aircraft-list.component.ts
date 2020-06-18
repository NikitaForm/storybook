import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { aircrafts } from './aircrafts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aircraft-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.scss']
})
export class AircraftListComponent {
  public gridData: any[] = aircrafts;

  constructor(private router: Router) {
  }

  @Output() onEdit = new EventEmitter();

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
      return 'Expired';
    }
    return 'Approved';
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
    if (context.dataItem.deleted) {
      return 'inactive';
    }
  }

  edit(a) {
    this.onEdit.emit(a);
    this.router.navigate(['edit', a.tailNumber]);
  }
}
