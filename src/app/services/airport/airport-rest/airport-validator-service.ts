import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FormGroup } from '@angular/forms';
import * as marketplaceContracts from '../../../domain/service-contracts/marketplace';
import * as airportContracts from '../../../domain/service-contracts/airport';
import * as models from '../../../domain/models';

// import { ValidateAirportAction, ValidateAirportSuccessAction, ValidateAirportFailAction } from '../../../application/actions/fbo';

import { catchError, filter, first, map, switchMap, take, withLatestFrom, delay } from 'rxjs/operators';

type AirportValidatorDelegate = (airport: models.Airport) => void;
type ValidatorFunction = (control: FormGroup) => Promise<any>;

@Injectable()
export class AirportValidationService implements airportContracts.IAirportService {

    private eftValidatorTimeout;
    private priceValidatorTimeout;

    constructor(
        @Inject(marketplaceContracts.SERVICE_TOKEN) private marketplaceService: marketplaceContracts.IMarketplaceService) { }

    getValidator(callback: AirportValidatorDelegate, controlName: String): ValidatorFunction {
        return (control: FormGroup) => {
            return new Promise((resolve, reject) => {
                const code = control.value.replace(/[^A-Za-z.]/g, '');

                if (code.length !== 4) {
                    callback(null);
                    resolve({ airportValidator: true });

                    return;
                }

                const request = new marketplaceContracts.GetAirportRequest();
                request.code = code;

                // this.store.dispatch(new ValidateAirportAction(controlName));

                this.marketplaceService
                    .getAirport(request)
                    .subscribe(serviceResponse => {
                        if (serviceResponse.entity) {
                            callback(serviceResponse.entity);
                            resolve(null);
                            // this.store.dispatch(new ValidateAirportSuccessAction(controlName));
                        } else {
                            callback(null);
                            resolve({ airportValidator: true });
                            // this.store.dispatch(new ValidateAirportSuccessAction(controlName));
                        }
                    }, () => {
                        callback(null);
                        resolve(null);
                    });
            });
        };
    }
}
