import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import * as services from '../services';
import * as dataContracts from '../services/operator/contracts/operator';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class UserAgreementGuard implements CanActivate {
  constructor(
    @Inject(dataContracts.SERVICE_TOKEN)
    private operatorService: dataContracts.IOperatorService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.operatorService.getUserAgreement(new dataContracts.GetUserAgreementRequest())
      .pipe(
        switchMap(serviceResponse => {
          if (serviceResponse.isAuthorized === true) {
            return of(true);
          }

          if ([1, 2, 5].indexOf(serviceResponse.userAccessDeniedReasonId) !== -1) {
            this.router.navigate(['/access-denied']);
          } else {
            this.router.navigate(['/user-agreement'], { queryParams: { 'return-url': state.url } });
          }

          return of(false);
        })
      );
  }
}
