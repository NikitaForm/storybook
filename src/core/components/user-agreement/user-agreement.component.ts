import { ChangeDetectionStrategy, Component, Input, Inject, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ResponseContentType } from '@angular/http';

import * as models from '../../models';
import * as dataContracts from '../../services/operator/contracts/operator';
import * as sharedServices from '../../../shared/services';

import { take } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAgreementComponent implements OnInit, OnDestroy {
  @Input() agreement: models.UserAgreement;
  showAgreement = false;

  asyncPipe$ = new BehaviorSubject(null);
  asyncPipeSubscription$: Subscription;
  downloadSubscription$: Subscription;

  blobUrl: string | ArrayBuffer = null;

  constructor(private http: sharedServices.BaseHttp, @Inject(dataContracts.SERVICE_TOKEN)
  private operatorService: dataContracts.IOperatorService, private sanitizer: DomSanitizer) {
    this.asyncPipeSubscription$ = this.asyncPipe$.subscribe(val => {
      if (val !== null) {
        this.blobUrl = val;
        this.showAgreement = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.asyncPipeSubscription$) {
      this.asyncPipeSubscription$.unsubscribe();
    }
    if (this.downloadSubscription$) {
      this.downloadSubscription$.unsubscribe();
    }
  }

  async ngOnInit(): Promise<void> {
    if (this.agreement !== null) {
      const req = new dataContracts.GetUserAgreementPdfRequest();
      req.url = this.agreement.documentUri;
      const b: Blob = await this.operatorService.getUserAgreementPdf(req).pipe(take(1)).toPromise();
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.asyncPipe$.next(reader.result);
      }, false);

      if (b) {
        reader.readAsDataURL(b);
      }
    }
  }

  innerHtml(): SafeHtml {
    // const url = await this.asyncPipe$.pipe(take(1)).toPromise();
    return this.sanitizer.bypassSecurityTrustHtml(
      `<object data='${this.blobUrl}' title='XO-Operator-Portal-Agreement' height='100%' width='100%' type='application/pdf'></object>`);
  }


  downloadPdf(): void {
    this.downloadSubscription$ = this.http
      .get(this.agreement.documentUri, { responseType: ResponseContentType.Blob })
      .pipe(take(1))
      .subscribe(res => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';

        const url = window.URL.createObjectURL(res.blob());
        a.href = url;
        a.download = `XO-Operator-Portal-Agreement.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
}
