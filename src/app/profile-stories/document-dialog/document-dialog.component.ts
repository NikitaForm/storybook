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
  selector: 'document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentDialogComponent implements OnInit{
  @Input() document;
  @Output() close = new EventEmitter<void>();
  blob: Blob;

  closeDialog(): void {
    this.close.emit();
  }

  async loadDocument() {
    this.blob = await this.pdfService.getPdfBlob(this.document.url).pipe(take(1)).toPromise();
  }

  @HostListener('document:keydown.escape', [ '$event' ])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.closeDialog();
  }

  constructor(
    private pdfService: PdfRestService) {
  }

  async ngOnInit() {
    await this.loadDocument();
  }
}
