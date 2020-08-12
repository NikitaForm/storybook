import { VersionHistory } from '../../../shared/components/version-history/version-history.component';

/*tslint:disable:max-line-length*/

export const versions: Array<VersionHistory> = [
  {
    version: '2.1.0',
    date: new Date('04-31-2019'),
    newFeatures: [
      {
        feature: 'Upgrade',
        description: 'Angular Upgrade'
      }
    ],
    bugFixes: [
    ]
  },
  {
    version: '2.0.0',
    date: new Date('03-31-2019'),
    newFeatures: [
      {
        feature: 'Redesign',
        description: 'Major Interface Redesign'
      }
    ],
    bugFixes: [
    ]
  },
  {
    version: '1.1.1',
    date: new Date('03-16-2018'),
    newFeatures: [
      {
        feature: 'my-flights',
        description: 'created filtering section in "My Flights" page'
      },
      {
        feature: 'my-flights',
        description: 'added auto-complete to the text inputs in the filtering section of "My Flights"'
      }
    ],
    bugFixes: [
      {
        feature: 'my-flights',
        description: 'fixed bug in the filtering section that led to multiple requests being made in the flights list'
      },
      {
        feature: 'my-flights',
        description: 'fixed bug that resulted from the interaction between pagination and filtering, had to re-structure the way ngrx handled the filtering process'
      }
    ]
  },
  {
    version: '1.0.3',
    date: new Date('02-15-2018'),
    newFeatures: [
      {
        feature: 'flight-details',
        description: 'created flight-details page where operators can see number of bookings and passenger details'
      }
    ],
    bugFixes: [
      {
        feature: 'flight-details',
        description: 'fixed the responsive layout of the flight details page in mobile size view'
      }
    ]
  },
  {
    version: '1.0.2',
    date: new Date('02-07-2018'),
    newFeatures: [
      {
        feature: 'shared-charters',
        description: 'added eft validation to shared-charters form'
      }
    ],
    bugFixes: [

    ]
  },
  {
    version: '1.0.1',
    date: new Date('02-02-2018'),
    newFeatures: [
      {
        feature: 'global',
        description: 'Added view permissions for the different features of the operator portal (one-way and shared-charters). These two sections require a permission (per organization) in order to be visible.'
      }
    ],
    bugFixes: [
      {
        feature: 'one-way-quote',
        description: 'fixed safari date parsing bug that was causing the one-way-quote form to crash in safari browsers.'
      }
    ]
  },
  {
    version: '1.0.0',
    date: new Date('01-25-2018'),
    newFeatures: [
      {
        feature: 'shared-charters',
        description: 'created and enabled a new page for shared charter flights'
      },
      {
        feature: 'global',
        description: 'created an error logger to publish errors through datadog'
      }
    ],
    bugFixes: [
      {
        feature: 'one-way-quote',
        description: 'fixed bugs in the one-way-quote form, including changing the timepicker and fixing validation tooltip issues'
      },
      {
        feature: 'global',
        description: 'changed all database connection strings to "ano_ujetapp". from now on there will be no development using "op_anodump".'
      }
    ]
  }
];
