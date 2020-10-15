import { User } from './user';
import { AircraftCategory } from './aircraft-category';
import { LegRequest } from './leg-request';
import { Operator } from './operator';
import { Status } from './status';
import { DBA } from '../../../../core/models/dba-enum';
import { ServiceClassEnum } from '../../../../shared/models/service-class-enum';
import { Aircraft } from './aircraft';

export class OperatorPurchaseOffer {
  sourcingRequestId: string;
  offerPrice: number = null;
  flightPrice: number;
  commission: number;
  operatorPrice: number;
  createdUser: User;
  offerCount = 0;
  aircraftCategory: AircraftCategory;
  lastModifiedDate: Date;
  lastModifiedUser: User;
  createdDate: Date;
  expirationDate: Date;
  legs: Array<LegRequest>;
  purchaseOfferId: string;
  operatorPurchaseOfferId: string;
  operator: Operator;
  status: Status;
  dba: DBA;
  serviceClass: ServiceClassEnum;
  acceptedDate?: Date;
  acceptedByUser?: User;
  openOffer: boolean;
  offerSubmitted: boolean;
  offerBid: number;
  aircraft: Aircraft;

  getServiceClass(): ServiceClassEnum {
    return this.serviceClass;
  }

  setServiceClass(serviceClass: ServiceClassEnum): OperatorPurchaseOffer {
    this.serviceClass = serviceClass;
    return this;
  }

  getDba(): DBA {
    return this.dba;
  }

  setDba(dba: DBA): OperatorPurchaseOffer {
    this.dba = dba;
    return this;
  }

  getPurchaseOfferId(): string {
    return this.purchaseOfferId;
  }

  setPurchaseOfferId(purchaseOfferId: string): OperatorPurchaseOffer {
    this.purchaseOfferId = purchaseOfferId;
    return this;
  }

  getOperator(): Operator {
    return this.operator;
  }

  setOperator(operator: Operator): OperatorPurchaseOffer {
    this.operator = operator;
    return this;
  }

  getExpirationDate(): Date {
    return this.expirationDate;
  }

  setExpirationDate(expirationDate: Date): OperatorPurchaseOffer {
    this.expirationDate = expirationDate;
    return this;
  }

  getOperatorPurchaseOfferId(): string {
    return this.operatorPurchaseOfferId;
  }

  setOperatorPurchaseOfferId(operatorPurchaseOfferId: string): OperatorPurchaseOffer {
    this.operatorPurchaseOfferId = operatorPurchaseOfferId;
    return this;
  }

  getSourcingRequestId(): string {
    return this.sourcingRequestId;
  }

  setSourcingRequestId(sourcingRequestId: string): OperatorPurchaseOffer {
    this.sourcingRequestId = sourcingRequestId;
    return this;
  }

  getAircraftCategory(): AircraftCategory {
    return this.aircraftCategory;
  }

  setAircraftCategory(aircraftCategory: AircraftCategory): OperatorPurchaseOffer {
    this.aircraftCategory = aircraftCategory;

    return this;
  }

  getFlightPrice(): number {
    return this.flightPrice;
  }

  setFlightPrice(flightPrice: number): OperatorPurchaseOffer {
    this.flightPrice = flightPrice;
    return this;
  }

  getCommission(): number {
    return this.commission;
  }

  setCommission(commission: number): OperatorPurchaseOffer {
    this.commission = commission;
    return this;
  }

  getOperatorPrice(): number {
    return this.operatorPrice;
  }

  seOperatorPrice(operatorPrice: number): OperatorPurchaseOffer {
    this.operatorPrice = operatorPrice;
    return this;
  }

  getOfferPrice(): number {
    return this.offerPrice;
  }

  setOfferPrice(maxPrice: number): OperatorPurchaseOffer {
    this.offerPrice = maxPrice;
    return this;
  }

  getLegs(): Array<LegRequest> {
    return this.legs;
  }

  setLegs(legs: Array<LegRequest>): OperatorPurchaseOffer {
    this.legs = legs;
    return this;
  }

  getLastModifiedDate(): Date {
    return this.lastModifiedDate;
  }

  setLastModifiedDate(lastModifiedDate: Date): OperatorPurchaseOffer {
    this.lastModifiedDate = lastModifiedDate;
    return this;
  }

  getLastModifiedUser(): User {
    return this.lastModifiedUser;
  }

  setLastModifiedUser(lastModifiedUser: User): OperatorPurchaseOffer {
    this.lastModifiedUser = lastModifiedUser;
    return this;
  }

  getCreatedDate(): Date {
    return this.createdDate;
  }

  setCreatedDate(createdDate: Date): OperatorPurchaseOffer {
    this.createdDate = createdDate;
    return this;
  }

  getCreatedUser(): User {
    return this.createdUser;
  }

  setCreatedUser(createdUser: User): OperatorPurchaseOffer {
    this.createdUser = createdUser;
    return this;
  }

  getStatus(): Status {
    return this.status;
  }

  setStatus(status: Status): OperatorPurchaseOffer {
    this.status = status;
    return this;
  }

  getOfferCount(): number {
    return this.offerCount;
   }

  setOfferCount(offerCount: number): OperatorPurchaseOffer {
    this.offerCount = offerCount;
    return this;
  }

  getAcceptedDate(): Date {
    return this.acceptedDate;
  }

  setAcceptedDate(acceptedDate: Date): OperatorPurchaseOffer {
    this.acceptedDate = acceptedDate;
    return this;
  }

  getAcceptedByUser(): User {
    return this.acceptedByUser;
  }

  setAcceptedByUser(acceptedByUser: User): OperatorPurchaseOffer {
    this.acceptedByUser = acceptedByUser;
    return this;
  }

}
