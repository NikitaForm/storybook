import { User } from './user';

export class StompMessage {
  actor: User;
  causationId: string;
  correlationId: string;
  createdDate: Date;
  messageId: string;
  messageType: string;
  operatorPurchaseOfferId: string;
  purchaseOfferId: string;
  sourcingRequestId: string;
}
