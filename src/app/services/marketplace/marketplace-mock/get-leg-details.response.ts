export const response = {
  'data': {
    'listAvailableFlights': {
      'availableFlights': [
        {
          'availableFlightId': '42d98502-94e2-4d97-8b35-bb39a9c498f5',
          'contractType': 'CHARTER',
          'aircraft': {'tailNumber': 'N1122K', 'modelName': 'Citation Excel', 'maxPax': 6, '__typename': 'Aircraft'},
          'status': 'BOOKED',
          'legacyLegId': 382193,
          'shuttlePricing': null,
          'charterPricing': {
            'customerPrice': 2434,
            'brokerShare': 608.5,
            'brokerRate': 0.25,
            'operatorShare': 1825.50,
            'federalTaxCost': 0.00,
            'segmentFeeCost': 0.00,
            'flightPrice': 1234,
            'flightRate': 500,
            'landingFee': 500,
            'densityFee': 200,
            'effective': '2020-08-12T11:58:43.761',
            'user': {'firstName': 'Test', 'lastName': 'Delta', '__typename': 'User'},
            '__typename': 'CharterPricing'
          },
          'seatsOffered': 6,
          'bookings': null,
          'passengers': null,
          'departureTime': '2020-08-25T00:00:00',
          'createdDepartureTime': '2020-08-25T00:00:00',
          'departureFbo': {
            'fboId': '9830',
            'address': {
              'line1': '5360 NW 20th Terrace, Fort Lauderdale, FL 33309',
              'line2': 'Fort Lauderdale Executive',
              'city': 'Fort Lauderdale',
              'state': 'FLORIDA',
              'country': 'UNITED STATES',
              '__typename': 'Address'
            },
            'phoneNumber': '(954) 491-3170',
            'name': 'Banyan Air Service',
            '__typename': 'FBO'
          },
          'arrivalFbo': {
            'fboId': '12848',
            'address': {
              'line1': '',
              'line2': null,
              'city': 'Teterboro',
              'state': 'NEW JERSEY',
              'country': 'UNITED STATES',
              '__typename': 'Address'
            },
            'phoneNumber': '(201) 288-1775x7',
            'name': 'Customs Hangar 1',
            '__typename': 'FBO'
          },
          'externalId': 'repo',
          'departureAirport': {
            'code': 'KFXE',
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
          'arrivalAirport': {
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
          'arrivalTime': '2020-08-31T00:00:00',
          'eft': 180,
          'priceType': 'FIXED',
          'shuttlePriceHistory': null,
          'charterPriceHistory': null,
          'expirationOffset': 3,
          'repositioningItinerary': {
            'flightRate': '500',
            'flexibility': '180',
            'landingFee': '500',
            itinerary: [{
              type: 'EMPTY_FLIGHT',
              startTime: '2020-08-06T03:00:00',
              duration: 30,
              flight: {
                'availableFlightId': 'b14e9f92-40f9-416e-9d4e-285894190289',
                'contractType': 'CHARTER',
                'aircraft': {'tailNumber': 'N1122K', 'modelName': 'Citation Excel', 'maxPax': 6, '__typename': 'Aircraft'},
                'status': 'OPEN',
                'legacyLegId': 382194,
                'shuttlePricing': null,
                'charterPricing': {
                  'customerPrice': 1000,
                  'brokerShare': 250.0,
                  'brokerRate': 0.25,
                  'operatorShare': 750.00,
                  'federalTaxCost': 0.00,
                  'segmentFeeCost': 0.00,
                  'flightPrice': 0,
                  'flightRate': 500,
                  'landingFee': 500,
                  'densityFee': 200,
                  'effective': '2020-08-12T12:21:43.396',
                  'user': {'firstName': 'Test', 'lastName': 'Delta', '__typename': 'User'},
                  '__typename': 'CharterPricing'
                },
                'seatsOffered': 6,
                'bookings': null,
                'passengers': null,
                'departureTime': '2020-08-28T02:00:00',
                'createdDepartureTime': '2020-08-28T02:00:00',
                'departureFbo': {
                  'fboId': '9830',
                  'address': {
                    'line1': '5360 NW 20th Terrace, Fort Lauderdale, FL 33309',
                    'line2': 'Fort Lauderdale Executive',
                    'city': 'Fort Lauderdale',
                    'state': 'FLORIDA',
                    'country': 'UNITED STATES',
                    '__typename': 'Address'
                  },
                  'phoneNumber': '(954) 491-3170',
                  'name': 'Banyan Air Service',
                  '__typename': 'FBO'
                },
                'arrivalFbo': {
                  'fboId': '9837',
                  'address': {
                    'line1': '3800 Southern Blvd, West Palm Beach, FL 33406',
                    'line2': 'Palm Beach Intl',
                    'city': 'West Palm Beach',
                    'state': 'FLORIDA',
                    'country': 'UNITED STATES',
                    '__typename': 'Address'
                  },
                  'phoneNumber': '(561) 683-4121',
                  'name': 'Atlantic Aviation Services',
                  '__typename': 'FBO'
                },
                'externalId': '2',
                'departureAirport': {
                  'code': 'KFXE',
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
                'arrivalAirport': {
                  'code': 'KPBI',
                  'address': {
                    'line1': null,
                    'line2': null,
                    'city': 'West Palm Beach',
                    'state': 'Florida',
                    'country': 'United States',
                    '__typename': 'Address'
                  },
                  '__typename': 'Airport'
                },
                'arrivalTime': '2020-08-28T02:25:00',
                'eft': 25,
                'priceType': 'FIXED',
                'shuttlePriceHistory': null,
                'charterPriceHistory': null,
                '__typename': 'AvailableFlight'
              }
            },
              {
                type: 'PRIVATE_CHARTER',
                startTime: '2020-08-06T03:00:00',
                duration: 30,
                flight: {
                  'availableFlightId': 'b6952599-3af2-4132-9a97-1be93f66cc6d',
                  'contractType': 'CHARTER',
                  'aircraft': {'tailNumber': 'N1122K', 'modelName': 'Citation Excel', 'maxPax': 6, '__typename': 'Aircraft'},
                  'status': 'OPEN',
                  'legacyLegId': 382197,
                  'shuttlePricing': null,
                  'charterPricing': {
                    'customerPrice': 1000,
                    'brokerShare': 250.0,
                    'brokerRate': 0.25,
                    'operatorShare': 750.00,
                    'federalTaxCost': 0.00,
                    'segmentFeeCost': 0.00,
                    'flightPrice': 1234,
                    'effective': '2020-08-12T12:39:52.918',
                    'user': {'firstName': 'Test', 'lastName': 'Delta', '__typename': 'User'},
                    '__typename': 'CharterPricing'
                  },
                  'seatsOffered': 6,
                  'bookings': null,
                  'passengers': null,
                  'departureTime': '2020-08-28T02:35:00',
                  'createdDepartureTime': '2020-08-28T08:00:00',
                  'departureFbo': {
                    'fboId': '9837',
                    'address': {
                      'line1': '3800 Southern Blvd, West Palm Beach, FL 33406',
                      'line2': 'Palm Beach Intl',
                      'city': 'West Palm Beach',
                      'state': 'FLORIDA',
                      'country': 'UNITED STATES',
                      '__typename': 'Address'
                    },
                    'phoneNumber': '(561) 683-4121',
                    'name': 'Atlantic Aviation Services',
                    '__typename': 'FBO'
                  },
                  'arrivalFbo': {
                    'fboId': '12848',
                    'address': {
                      'line1': '',
                      'line2': null,
                      'city': 'Teterboro',
                      'state': 'NEW JERSEY',
                      'country': 'UNITED STATES',
                      '__typename': 'Address'
                    },
                    'phoneNumber': '(201) 288-1775x7',
                    'name': 'Customs Hangar 1',
                    '__typename': 'FBO'
                  },
                  'externalId': '3',
                  'departureAirport': {
                    'code': 'KPBI',
                    'address': {
                      'line1': null,
                      'line2': null,
                      'city': 'West Palm Beach',
                      'state': 'Florida',
                      'country': 'United States',
                      '__typename': 'Address'
                    },
                    '__typename': 'Airport'
                  },
                  'arrivalAirport': {
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
                  'arrivalTime': '2020-08-28T05:00:00',
                  'eft': 160,
                  'priceType': 'FIXED',
                  'shuttlePriceHistory': null,
                  'charterPriceHistory': null,
                  '__typename': 'AvailableFlight'
                }
              }
            ]
          }
        } as any,
        {
          'availableFlightId': '0cd406c5-1fd6-4135-89f5-394bb2010abf',
          'contractType': 'CHARTER',
          'aircraft': {'tailNumber': 'N173KR', 'modelName': 'Learjet 60', 'maxPax': 6, '__typename': 'Aircraft'},
          'status': 'OPEN',
          'legacyLegId': 381613,
          'shuttlePricing': null,
          'charterPricing': {
            'customerPrice': 4444,
            'brokerShare': 1111.0,
            'brokerRate': 0.25,
            'operatorShare': 3333.00,
            'federalTaxCost': 0.00,
            'segmentFeeCost': 0.00,
            'flightPrice': 4444,
            'effective': '2020-08-05T12:50:27.373',
            'user': {'firstName': 'Test', 'lastName': 'Delta', '__typename': 'User'},
            '__typename': 'CharterPricing'
          },
          'seatsOffered': 6,
          'bookings': null,
          'passengers': null,
          'departureTime': '2020-08-07T00:12:00',
          'createdDepartureTime': '2020-08-06T00:00:00',
          'departureFbo': {
            'fboId': '12848',
            'address': {
              'line1': '',
              'line2': null,
              'city': 'Teterboro',
              'state': 'NEW JERSEY',
              'country': 'UNITED STATES',
              '__typename': 'Address'
            },
            'phoneNumber': '(201) 288-1775x7',
            'name': 'Customs Hangar 1',
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
          'externalId': 'dd',
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
          'arrivalTime': '2020-08-06T03:00:00',
          'eft': 180,
          'priceType': 'FIXED',
          'shuttlePriceHistory': null,
          'charterPriceHistory': null,
          '__typename': 'AvailableFlight',
          'expirationOffset': 3,
          'repositioningItinerary': {
            'flightRate': '44',
            'flexibility': '60',
            'landingFee': '44',
            // itinerary: [{
            //   type: 'PRIVATE_CHARTER',
            //   startTime: '2020-08-06T03:00:00',
            //   duration: 200,
            //   // flight: {
            //   //   'availableFlightId': '0cd406c5-1fd6-4135-89f5-394bb2010abf',
            //   //   'contractType': 'CHARTER',
            //   //   'aircraft': {'tailNumber': 'N173KR', 'modelName': 'Learjet 60', 'maxPax': 6, '__typename': 'Aircraft'},
            //   //   'status': 'OPEN',
            //   //   'legacyLegId': 381610,
            //   //   'shuttlePricing': null,
            //   //   'charterPricing': {
            //   //     'customerPrice': 4444,
            //   //     'brokerShare': 1111.0,
            //   //     'brokerRate': 0.25,
            //   //     'operatorShare': 3333.00,
            //   //     'federalTaxCost': 0.00,
            //   //     'segmentFeeCost': 0.00,
            //   //     'flightPrice': 4444,
            //   //     'effective': '2020-08-05T12:50:27.373',
            //   //     'user': {'firstName': 'Test', 'lastName': 'Delta', '__typename': 'User'},
            //   //     '__typename': 'CharterPricing'
            //   //   },
            //   //   'seatsOffered': 6,
            //   //   'bookings': null,
            //   //   'passengers': null,
            //   //   'departureTime': '2020-08-07T00:12:00',
            //   //   'createdDepartureTime': '2020-08-06T00:00:00',
            //   //   'departureFbo': {
            //   //     'fboId': '12848',
            //   //     'address': {
            //   //       'line1': '',
            //   //       'line2': null,
            //   //       'city': 'Teterboro',
            //   //       'state': 'NEW JERSEY',
            //   //       'country': 'UNITED STATES',
            //   //       '__typename': 'Address'
            //   //     },
            //   //     'phoneNumber': '(201) 288-1775x7',
            //   //     'name': 'Customs Hangar 1',
            //   //     '__typename': 'FBO'
            //   //   },
            //   //   'arrivalFbo': {
            //   //     'fboId': '9827',
            //   //     'address': {
            //   //       'line1': '240 SW 34th St, Fort Lauderdale, FL 33315',
            //   //       'line2': 'Fort Lauderdale/Hollywood Intl',
            //   //       'city': 'Fort Lauderdale',
            //   //       'state': 'FLORIDA',
            //   //       'country': 'UNITED STATES',
            //   //       '__typename': 'Address'
            //   //     },
            //   //     'phoneNumber': '(954) 359-9991',
            //   //     'name': 'JetScape Services',
            //   //     '__typename': 'FBO'
            //   //   },
            //   //   'externalId': 'dd',
            //   //   'departureAirport': {
            //   //     'code': 'KTEB',
            //   //     'address': {
            //   //       'line1': null,
            //   //       'line2': null,
            //   //       'city': 'Teterboro',
            //   //       'state': 'New Jersey',
            //   //       'country': 'United States',
            //   //       '__typename': 'Address'
            //   //     },
            //   //     '__typename': 'Airport'
            //   //   },
            //   //   'arrivalAirport': {
            //   //     'code': 'KFLL',
            //   //     'address': {
            //   //       'line1': null,
            //   //       'line2': null,
            //   //       'city': 'Fort Lauderdale',
            //   //       'state': 'Florida',
            //   //       'country': 'United States',
            //   //       '__typename': 'Address'
            //   //     },
            //   //     '__typename': 'Airport'
            //   //   },
            //   //   'arrivalTime': '2020-08-06T03:00:00',
            //   //   'eft': 180,
            //   //   'priceType': 'FIXED',
            //   //   'shuttlePriceHistory': null,
            //   //   'charterPriceHistory': null,
            //   // }
            // }
            // ]
          }
        } as any,
        {
          'availableFlightId': 'a1e70251-e4e1-4938-bbce-96d74d6b4f41',
          'contractType': 'SHUTTLE',
          'aircraft': {'tailNumber': 'N227SV', 'modelName': 'Gulfstream IV', 'maxPax': 13, '__typename': 'Aircraft'},
          'status': 'OPEN',
          'legacyLegId': 382859,
          'shuttlePricing': {
            'seatsOffered': 6,
            'customerPrice': 420.00,
            'operatorShare': 300.00,
            'brokerShare': 100.0,
            'brokerRate': 0.25,
            'creditCardCost': 20.00,
            'federalTaxCost': 0.00,
            'segmentFeeCost': 0.00,
            'seatPrice': 400,
            'effective': '2020-08-19T19:45:00.376',
            'user': {'firstName': 'Test', 'lastName': 'Delta', '__typename': 'User'},
            '__typename': 'ShuttlePricing'
          },
          'charterPricing': null,
          'seatsOffered': 6,
          'bookings': null,
          'passengers': null,
          'departureTime': '2020-09-02T13:20:00',
          'createdDepartureTime': '2020-09-02T13:20:00',
          'expirationOffset': 3,
          'departureFbo': {
            'fboId': '10134',
            'address': {
              'line1': '544 Airport Rd Warwick, RI 02886',
              'line2': null,
              'city': 'Providence',
              'state': 'RHODE ISLAND',
              'country': 'UNITED STATES',
              '__typename': 'Address'
            },
            'phoneNumber': '(401) 738-2600',
            'name': 'Northstar Aviation Inc',
            '__typename': 'FBO'
          },
          'arrivalFbo': {
            'fboId': '13165',
            'address': {
              'line1': '1 Marine Terminal Rd, Flushing, NY 11371',
              'line2': null,
              'city': 'New York',
              'state': 'NEW YORK',
              'country': 'UNITED STATES',
              '__typename': 'Address'
            },
            'phoneNumber': '718-779-4040',
            'name': 'Sheltair Aviation Services',
            '__typename': 'FBO'
          },
          'externalId': null,
          'departureAirport': {
            'code': 'KPVD',
            'address': {
              'line1': null,
              'line2': null,
              'city': 'Providence',
              'state': 'Rhode Island',
              'country': 'United States',
              '__typename': 'Address'
            },
            '__typename': 'Airport'
          },
          'arrivalAirport': {
            'code': 'KLGA',
            'address': {
              'line1': null,
              'line2': null,
              'city': 'New York',
              'state': 'New York',
              'country': 'United States',
              '__typename': 'Address'
            },
            '__typename': 'Airport'
          },
          'arrivalTime': '2020-09-02T14:05:00',
          'eft': 45,
          'priceType': 'DYNAMIC',
          'shuttlePriceHistory': [{
            'seatPrice': 400,
            'effective': '2020-08-19T06:25:24.104',
            'seatsOffered': 8,
            'user': {'firstName': 'Test', 'lastName': 'Delta', '__typename': 'User'},
            '__typename': 'ShuttlePricing'
          }, {
            'seatPrice': 400,
            'effective': '2020-08-19T19:32:30.917',
            'seatsOffered': 7,
            'user': {'firstName': 'Test', 'lastName': 'Delta', '__typename': 'User'},
            '__typename': 'ShuttlePricing'
          }, {
            'seatPrice': 400,
            'effective': '2020-08-19T19:34:37.391',
            'seatsOffered': 6,
            'user': {'firstName': 'Test', 'lastName': 'Delta', '__typename': 'User'},
            '__typename': 'ShuttlePricing'
          }, {
            'seatPrice': 400,
            'effective': '2020-08-19T19:37:51.463',
            'seatsOffered': 8,
            'user': {'firstName': 'Test', 'lastName': 'Delta', '__typename': 'User'},
            '__typename': 'ShuttlePricing'
          }],
          'charterPriceHistory': null,
          'actualDepartureTime': '2020-09-02T13:20:00',
          'actualArrivalTime': '2020-09-02T14:05:00',
          '__typename': 'AvailableFlight'
        } as any], '__typename': 'AvailableFlightPagination'
    }
  }
};
