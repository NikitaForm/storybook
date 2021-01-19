import { Component, OnInit, Inject, OnDestroy, Output, EventEmitter, HostListener, ViewEncapsulation, Input } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as models from '../../domain/models';
import * as actions from '../../application/actions/flight-details';
import * as reducers from '../../application/reducers';
import * as marketplaceContracts from '../../domain/service-contracts/marketplace';

import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { take, delay, map, catchError } from 'rxjs/operators';

// declare var moment: any;
import * as moment from 'moment';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { PdfRestService } from '../../services/pdf/pdf.service';

@Component({
  selector: 'users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersDialogComponent implements OnInit{
  @Input() users;
  @Output() close = new EventEmitter<void>();
  blob: Blob;

  closeDialog(): void {
    this.close.emit();
  }

  @HostListener('document:keydown.escape', [ '$event' ])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.closeDialog();
  }

  constructor() {
  }

  async ngOnInit() {
  }
}
