import * as models from '../../../domain/models';
import * as coreModels from '../../../../../core/models';
import * as moment from 'moment';

export class OfferMapper {
  private static instance: OfferMapper = new OfferMapper();

  static Instance(): OfferMapper {
    return OfferMapper.instance;
  }

  legRequestDtoToLegRequest(item: any): models.LegRequest {
    return new models.LegRequest()
      .setDepartureDate(moment(item.departureDate).toDate())
      .setDepartureTimeTbd(Boolean(item.departureTimeTbd))
      .setPax(Number(item.pax))
      .setRoute(this.routeDtoToRoute(item.route));
  }

  routeDtoToRoute(item: any): models.Route {
    const r1 = new models.Route();
    r1.originAirport = this.airportDtoToAirport(item.originAirport);
    r1.destinationAirport = this.airportDtoToAirport(item.destinationAirport);
    return r1;
  }

  airportDtoToAirport(item: any): models.Airport {
    const a1 = new models.Airport();
    a1.code = item.code;
    return a1;
  }


  aircraftCategoryDtoToAircraftCategory(item: any): models.AircraftCategory {
    const ac1 = new models.AircraftCategory();

    ac1.setId(Number(item.aircraftCategoryId))
      .setName(item.name);

    return ac1;
  }

  operatorDtoToOperator(item: any): models.Operator {
    const o1 = new models.Operator();

    o1.operatorId = item.id;
    o1.name = item.name;

    return o1;
  }


  operatorPurchaseOfferDtoToOperatorPurchaseOffer(source: any): models.OperatorPurchaseOffer {
    const op = new models.OperatorPurchaseOffer()
      .setCreatedDate(moment(source.createdDate).toDate())
      .setSourcingRequestId(source.sourcingRequestId)
      .setCreatedUser(this.userDtoToUser(source.createdUser))
      .setExpirationDate(moment.utc(source.expirationDate).toDate())
      .setOfferPrice(source.offerPrice)
      .setCommission(source.commission)
      .seOperatorPrice(source.operatorPrice)
      .setFlightPrice(source.flightPrice)
      .setLegs(source.legs.map(l => this.legRequestDtoToLegRequest(l)))
      .setPurchaseOfferId(source.purchaseOfferId)
      .setOperatorPurchaseOfferId(source.operatorPurchaseOfferId)
      .setStatus(this.statusDtoToStatus(source.status))
      .setDba(this.dbaMapper(source.dba))
      .setOfferCount(source.offerCount)
      .setServiceClass(source.serviceClassId);

    if (source.lastModifiedDate) {
      op.setLastModifiedDate(moment(source.lastModifiedDate).toDate());
    }

    if (source.lastModifiedUser) {
      op.setLastModifiedUser(this.userDtoToUser(source.lastModifiedUser));
    }

    if (source.aircraftCategory) {
      op.setAircraftCategory(this.aircraftCategoryDtoToAircraftCategory(source.aircraftCategory));
    }

    if (source.operator) {
      op.setOperator(this.operatorDtoToOperator(source.operator));
    }

    if (source.acceptedDate) {
      op.setAcceptedDate(moment(source.acceptedDate).toDate());
    }

    if (source.acceptedByUser) {
      op.setAcceptedByUser(this.userDtoToUser(source.acceptedByUser));
    }

    op.openOffer = source.openOffer;
    op.offerSubmitted = source.offerSubmitted;

    return op;
  }

  dbaMapper(dba: string): coreModels.DBA {
    switch (dba) {
      case 'JS':
        return coreModels.DBA.JS;
      case 'XO':
        return coreModels.DBA.XO;
      default:
        return coreModels.DBA.JS;
    }
  }

  statusDtoToStatus(source: any): models.Status {
    return new models.Status()
      .setId(source.id)
      .setName(source.name);
  }

  userDtoToUser(item: any): models.User {
    const u1 = new models.User();
    if (!item) {
      return u1;
    }
    u1.id = Number(item.id);
    u1.firstName = item.firstName;
    u1.lastName = item.lastName;
    u1.emailAddress = item.emailAddress;

    return u1;
  }
}
