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
          'repositioningItinerary': {
            'flightRate': '500',
            'flexibility': '200',
            'landingFee': '500',
            itinerary: [{
              type: 'PRIVATE_CHARTER',
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
              }},
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
      } as any], '__typename': 'AvailableFlightPagination'
    }
  }
};
