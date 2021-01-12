import {
  ChangeDetectionStrategy, Component, Input, ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'profile-view',
  templateUrl: `./profile-view.component.html`,
  styleUrls: ['./profile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProfileViewComponent {

  @Input() operator;

  constructor() {
    this.operator = {
      'name': 'XOJET',
      'legalName': 'XOJet, Inc',
      'legalNamePca': null,
      'dotName': null,
      'description': null,
      'disclaimer': null,
      'dba': null,
      'offerPreviews': null,
      'automatedSourcingForGuaranteed': true,
      'allowShuttles': null,
      'eulaAccepted': true,
      'eulaAcceptedBy': null,
      'sapIntegration': null,
      'aircraft': [],
      'active': true,
      'addressLine1': '2000 Sierra Point Parkway',
      'addressLine2': null,
      'addressLine3': null,
      'city': 'Brisbane',
      'countryCode': 'US',
      'stateProvince': 'California',
      'postalCode': '94005',
      'phoneNumber1': '1.650.676.4700',
      'phoneNumber2': null,
      'created': '2016-08-13T03:32:04.184',
      'aircraftOperatorId': null,
      'operatorId': 8,
      'intacctId': null,
      'intacctName': null,
      'dotFilingsEmail': null,
      'chartersEmail': 'charter@xojet.com',
      'emptyLegsEmaii': null,
      'fulfillEmail': 'offers@flyxo.com',
      'shuttlesEmail': null,
      'websiteUrl': 'http://www.xojet.com/'
    };

  }

}
