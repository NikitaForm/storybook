import { Aircraft } from '../../../domain/models/aircraft';
import { AircraftModel } from '../../../domain/models/aircraft-model';

import * as _ from 'lodash';
import * as moment from 'moment';

export class AircraftMapperService {

  static parseAircraftSearchItemInternal(item: any): Aircraft {

    const a = new Aircraft();
    a.aircraftId = item['aircraftId'];
    a.aircraftModel = item['modelName'];
    a.marketableSeatsCount = item['maxPax'];
    a.tailNumber = item['tailNumber'];

    // Date Handling
    const exp1 = _.get(item, 'insuranceExpirationDate', null);
    a.insuranceExpirationDate = exp1 !== null ? moment(exp1).toDate() : null;
    /** TODO fix approved mapping */
    a.insuranceApproved = _.get(item, 'insuranceApproved', true);

    const aircraftModel = new AircraftModel();
    aircraftModel.name = item['modelName'];
    a.aircraftModel = aircraftModel;

    return a;
  }
}
