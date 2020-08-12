import { Injectable, Inject } from '@angular/core';
import { Resolve } from '@angular/router';
import * as models from '../models';
import { OperatorService } from '../services';
import * as dataContracts from '../services/operator/contracts/operator';
import { Observable } from 'rxjs/Observable';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class UserAgreementResolver implements Resolve<models.UserAgreement> {
  constructor(
    @Inject(dataContracts.SERVICE_TOKEN)
    private operatorService: dataContracts.IOperatorService) {
  }

  resolve(): Observable<models.UserAgreement> {
    return this.operatorService.getUserAgreement(new dataContracts.GetUserAgreementRequest())
      .pipe(
        map((response: dataContracts.GetUserAgreementResponse) => {
          const userAgreement = new models.UserAgreement();

          userAgreement.documentUri = response.remainingDocumentUrlToDownload;
          userAgreement.actionUri = response.remainingDocumentUrlToAccept;

          return userAgreement;
        })
      );
  }
}
