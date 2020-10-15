import * as models from '../../../domain/models';

import * as _ from 'lodash';
import * as moment from 'moment';

export class AircraftMapper {
  private static instance: AircraftMapper = new AircraftMapper();

  static Instance(): AircraftMapper {
    return AircraftMapper.instance;
  }

  aircraftModelDtoToAircraft(item): models.AircraftModel {
    return new models.AircraftModel().setName(item.name);
  }

  aircraftDtoToAircraft(item: any): models.Aircraft {
    // Date Handling
    const exp1 = _.get(item, 'insuranceExpirationDate', null);
    const exp2 = exp1 !== null ? moment(exp1).toDate() : null;

    return new models.Aircraft()
      .setAircraftId(item.aircraftId || item.id)
      .setServiceClass(item.serviceClassId)
      .setCategory(this.aircraftCategoryDtoToCategroy(item))
      .setTailNumber(item.tailNumber)
      .setModelName(item.modelName)
      .setInsuranceApproved(_.get(item, 'insuranceApproved', false))
      .setInsuranceExpiration(exp2)
      .setMarketableSeatsCount(item.marketableSeatsCount);
  }

  aircraftCategoryDtoToCategroy(item: any): models.AircraftCategory {
    return new models.AircraftCategory()
      .setId(Number(item.categoryId))
      .setName(item.categoryName);
  }
}
