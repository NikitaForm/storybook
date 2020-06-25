export const response = {
  'data': {
    'listAvailableFlights': [{
      'availableFlightId': '604ea189-42cc-4fab-9bb8-838f4f47d830',
      'contractType': 'SHUTTLE',
      'aircraft': {'tailNumber': 'N175MX', 'modelName': 'Learjet 75', 'maxPax': 8, '__typename': 'Aircraft'},
      'status': 'OPEN',
      'legacyLegId': 374071,
      'shuttlePricing': {
        'seatsOffered': 3,
        'customerPrice': 387.00,
        'operatorShare': 253.50,
        'brokerShare': 84.5,
        'brokerRate': 0.25,
        'creditCardCost': 18.38,
        'federalTaxCost': 25.35,
        'segmentFeeCost': 4.30,
        'seatPrice': 338,
        'effective': '2020-04-24T11:42:06.202',
        '__typename': 'ShuttlePricing'
      },
      'charterPricing': null,
      'seatsOffered': 3,
      'bookings': null,
      'departureTime': '2020-04-25T00:00:00',
      'departureFbo': {
        'fboId': '9861',
        'address': {
          'line1': '101 Charles A. Lindbergh Dr., Teterboro, NJ 07608',
          'line2': 'Teterboro',
          'city': 'Teterboro',
          'state': 'NEW JERSEY',
          'country': 'UNITED STATES',
          '__typename': 'Address'
        },
        'phoneNumber': '(201) 288-3555',
        'name': 'Signature Flight Support South',
        '__typename': 'FBO'
      },
      'arrivalFbo': {
        'fboId': '9827',
        'address': {
          'line1': '240 SW 34th St, Fort Lauderdale, FL 33315',
          'line2': 'Fort Lauderdale/Hollywood Intl',
          'city': 'Fort Lauderdale',
          'state': 'FLORIDA',
          'country': 'UNITED STATES',
          '__typename': 'Address'
        },
        'phoneNumber': '(954) 359-9991',
        'name': 'JetScape Services',
        '__typename': 'FBO'
      },
      'externalId': '333',
      'departureAirport': {
        'code': 'KTEB',
        'address': {
          'line1': null,
          'line2': null,
          'city': 'Teterboro',
          'state': 'New Jersey',
          'country': 'United States',
          '__typename': 'Address'
        },
        '__typename': 'Airport'
      },
      'arrivalAirport': {
        'code': 'KFLL',
        'address': {
          'line1': null,
          'line2': null,
          'city': 'Fort Lauderdale',
          'state': 'Florida',
          'country': 'United States',
          '__typename': 'Address'
        },
        '__typename': 'Airport'
      },
      'arrivalTime': '2020-04-25T00:00:00',
      'eft': 129,
      'priceType': 'DYNAMIC',
      'auditLog': [{
        'timestamp': '2020-04-24T11:41:29.995',
        'topic': 'Status',
        'subject': 'Created',
        'message': 'Available flight was created',
        'documentId': '604ea189-42cc-4fab-9bb8-838f4f47d830',
        'userEmail': 'test.delta@detla.com',
        '__typename': 'AuditLogEvent'
      }, {
        'timestamp': '2020-04-24T11:41:54.765',
        'topic': 'Price',
        'subject': 'Updated',
        'message': 'Pricing changed: seat price change, superseded: 333, effective: 338',
        'documentId': '604ea189-42cc-4fab-9bb8-838f4f47d830',
        'userEmail': 'test.delta@detla.com',
        '__typename': 'AuditLogEvent'
      }, {
        'timestamp': '2020-04-24T11:42:06.478',
        'topic': 'Price',
        'subject': 'Updated',
        'message': 'Pricing changed: seats offerd change, superseded: 2, effective: 3',
        'documentId': '604ea189-42cc-4fab-9bb8-838f4f47d830',
        'userEmail': 'test.delta@detla.com',
        '__typename': 'AuditLogEvent'
      }, {
        'timestamp': '2020-04-24T11:42:13.161',
        'topic': 'Status',
        'subject': 'Updated',
        'message': 'Status changed, superseded: OPEN, effective: CLOSED',
        'documentId': '604ea189-42cc-4fab-9bb8-838f4f47d830',
        'userEmail': 'test.delta@detla.com',
        '__typename': 'AuditLogEvent'
      }, {
        'timestamp': '2020-04-24T11:42:21.036',
        'topic': 'Status',
        'subject': 'Updated',
        'message': 'Status changed, superseded: CLOSED, effective: OPEN',
        'documentId': '604ea189-42cc-4fab-9bb8-838f4f47d830',
        'userEmail': 'test.delta@detla.com',
        '__typename': 'AuditLogEvent'
      }],
      'shuttlePriceHistory': [{
        'seatPrice': 333,
        'effective': '2020-04-24T11:41:29.389',
        '__typename': 'ShuttlePricing'
      }, {'seatPrice': 338, 'effective': '2020-04-24T11:41:54.612', '__typename': 'ShuttlePricing'}],
      'charterPriceHistory': null,
      '__typename': 'AvailableFlight'
    } as any]
  }
};
