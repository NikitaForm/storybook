import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation
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
  @Output() showDocument = new EventEmitter();

  constructor() {
    this.operator = {
      'name': 'XOJET',
      'legalName': 'XOJet, Inc',
      'legalNamePca': null,
      firstName: 'Test',
      lastName: 'Xojet',
      title: 'Xojet Title',
      email: 'test@xojet.com',
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
      'phoneNumber1': '+1-650-676-4700',
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
      'websiteUrl': 'http://www.xojet.com/',
      'argusRating': {'argusRatingId': 'ARGUS_PLATINUM', 'name': 'ARGUS Platinum'},
      'wyvernRating': {'wyvernRatingId': 'WYVERN_WINGMAN', 'name': 'Wyvern Wingman'},
      'isBaoRating': {'isBaoRatingId': 'STAGE_ONE', 'name': 'Stage One'},
      'prospectus': {
        'approved': true,
        'prospectusNumber': '1123',
        'aocNumber': '1122',
        'approvalDate': null,
        'expirationDate': new Date('2022-12-19')
      },
      'serviceAreas': [
        {'aircraftCategoryId': 4, 'regionIds': ['PSW', 'PNW', 'MTN', 'NCEN', 'SCEN', 'NE']},
        {
          'aircraftCategoryId': 5,
          'regionIds': ['NCEN', 'SE', 'OTH']
        },
        {'aircraftCategoryId': 6, 'regionIds': ['PSW', 'PNW', 'MTN', 'NCEN', 'SCEN', 'NE', 'SE', 'CARI', 'OTH']}],
      'operatorDocuments': {
        ci: [
          {
            'operatorDocumentId': '59853f79-4938-4129-aebd-050be725c6ed',
            'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
            'fileName': 'certificate-of-insurance1.jpg',
            'url': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Dr._Jekyll_and_Mr._Hyde_Text.jpg',
            'status': 'ACTIVE',
            'docTypeId': 1,
            'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
            'activities': [{'status': 'ACTIVE', 'timestamp': 1595443242219, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
          }, {
            'operatorDocumentId': 'caa4e02c-5f41-41ec-bfba-f277be3f3924',
            'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
            'fileName': 'certificate-of-insurance2.pdf',
            'url': 'https://www.soundczech.cz/temp/lorem-ipsum.pdf',
            'status': 'ACTIVE',
            'docTypeId': 1,
            'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
            'activities': [{'status': 'ACTIVE', 'timestamp': 1595443339795, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
          }],
        d085: [
          {
            'operatorDocumentId': '13dc0a97-5cdc-4139-aa85-3f57c192ce7d',
            'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
            'fileName': 'operating-certificate1.jpg',
            'url': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Dr._Jekyll_and_Mr._Hyde_Text.jpg',
            'status': 'DELETED',
            'docTypeId': 3,
            'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
            'activities': [{
              'status': 'DELETED',
              'timestamp': 1595443371691,
              'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}
            }, {'status': 'ACTIVE', 'timestamp': 1595443356332, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
          }, {
            'operatorDocumentId': '2c81caec-20e0-4a9a-998b-2616545e246b',
            'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
            'fileName': 'operating-certificate2.pdf',
            'url': 'https://www.soundczech.cz/temp/lorem-ipsum.pdf',
            'status': 'ACTIVE',
            'docTypeId': 3,
            'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
            'activities': [{'status': 'ACTIVE', 'timestamp': 1595443384091, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
          }],
        oc: [{
          'operatorDocumentId': '79ca1da7-9ea8-4dbb-a0ec-aada66fd4f97',
          'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
          'fileName': 'operation-spec1.jpg',
          'url': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Dr._Jekyll_and_Mr._Hyde_Text.jpg',
          'status': 'ACTIVE',
          'docTypeId': 2,
          'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
          'activities': [{'status': 'ACTIVE', 'timestamp': 1595443510042, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
        }, {
          'operatorDocumentId': '2816205f-a536-4e8f-9bb5-fa3921fde252',
          'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
          'fileName': 'operation-spec2.pdf',
          'url': 'https://www.soundczech.cz/temp/lorem-ipsum.pdf',
          'status': 'ACTIVE',
          'docTypeId': 1,
          'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
          'activities': [{'status': 'ACTIVE', 'timestamp': 1595443926764, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
        }]
      }
    };

    const vendor = {
      'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
      'aircraftOperatorId': 2051,
      'name': 'Test Jack Operator',
      'legalName': 'Test Jack Operator',
      'intacctIntegration': {'intacctId': null},
      'sapIntegration': {'sapVendorId': null, 'qaSapVendorId': null},
      'argusRating': {'argusRatingId': 'ARGUS_GOLD', 'name': 'ARGUS Gold'},
      'wyvernRating': {'wyvernRatingId': 'WYVERN_REGISTERED', 'name': 'Wyvern Registered'},
      'isBaoRating': {'isBaoRatingId': null, 'name': null},
      'offFleetPartner': false,
      'automatedSourcingForGuaranteed': true,
      'vendorContact': {'firstName': null, 'lastName': null, 'title': null, 'phoneNumber': null, 'email': null},
      'operatorDocuments': [{
        'operatorDocumentId': '59853f79-4938-4129-aebd-050be725c6ed',
        'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
        'fileName': 'file_example_JPG_1MB.jpg',
        'url': 'https://xo-operator-documents-dev.s3.amazonaws.com/certificate-of-insurance/59853f79-4938-4129-aebd-050be725c6ed.jpg',
        'status': 'ACTIVE',
        'docTypeId': 1,
        'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
        'activities': [{'status': 'ACTIVE', 'timestamp': 1595443242219, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
      }, {
        'operatorDocumentId': 'caa4e02c-5f41-41ec-bfba-f277be3f3924',
        'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
        'fileName': 'file_example_JPG_1MB(2).jpg',
        'url': 'https://xo-operator-documents-dev.s3.amazonaws.com/certificate-of-insurance/caa4e02c-5f41-41ec-bfba-f277be3f3924.jpg',
        'status': 'ACTIVE',
        'docTypeId': 1,
        'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
        'activities': [{'status': 'ACTIVE', 'timestamp': 1595443339795, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
      }, {
        'operatorDocumentId': '13dc0a97-5cdc-4139-aa85-3f57c192ce7d',
        'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
        'fileName': 'file_example_JPG_1MB.jpg',
        'url': 'https://xo-operator-documents-dev.s3.amazonaws.com/operating-certificate/13dc0a97-5cdc-4139-aa85-3f57c192ce7d.jpg',
        'status': 'DELETED',
        'docTypeId': 3,
        'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
        'activities': [{
          'status': 'DELETED',
          'timestamp': 1595443371691,
          'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}
        }, {'status': 'ACTIVE', 'timestamp': 1595443356332, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
      }, {
        'operatorDocumentId': '2c81caec-20e0-4a9a-998b-2616545e246b',
        'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
        'fileName': 'file_example_JPG_1MB(2).jpg',
        'url': 'https://xo-operator-documents-dev.s3.amazonaws.com/operating-certificate/2c81caec-20e0-4a9a-998b-2616545e246b.jpg',
        'status': 'ACTIVE',
        'docTypeId': 3,
        'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
        'activities': [{'status': 'ACTIVE', 'timestamp': 1595443384091, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
      }, {
        'operatorDocumentId': '8a3b9b61-c95a-4390-92fb-e311888fc496',
        'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
        'fileName': 'file_example_GIF_1MB.gif',
        'url': 'https://xo-operator-documents-dev.s3.amazonaws.com/operation-spec-d085/8a3b9b61-c95a-4390-92fb-e311888fc496.gif',
        'status': 'ACTIVE',
        'docTypeId': 2,
        'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
        'activities': [{'status': 'ACTIVE', 'timestamp': 1595443408134, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
      }, {
        'operatorDocumentId': '79ca1da7-9ea8-4dbb-a0ec-aada66fd4f97',
        'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
        'fileName': '2.gif',
        'url': 'https://xo-operator-documents-dev.s3.amazonaws.com/operation-spec-d085/79ca1da7-9ea8-4dbb-a0ec-aada66fd4f97.gif',
        'status': 'ACTIVE',
        'docTypeId': 2,
        'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
        'activities': [{'status': 'ACTIVE', 'timestamp': 1595443510042, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
      }, {
        'operatorDocumentId': '2816205f-a536-4e8f-9bb5-fa3921fde252',
        'operatorId': 'a381e12e-85f5-49d1-8d1f-96f548fd72cc',
        'fileName': 'file-sample_150kB.pdf',
        'url': 'https://xo-operator-documents-dev.s3.amazonaws.com/certificate-of-insurance/2816205f-a536-4e8f-9bb5-fa3921fde252.pdf',
        'status': 'ACTIVE',
        'docTypeId': 1,
        'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
        'activities': [{'status': 'ACTIVE', 'timestamp': 1595443926764, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
      }],
      'organization': {'id': 766, 'name': 'Test Jack Operator'},
      'serviceAreas': [{'aircraftCategoryId': 2, 'regionIds': [4, 7]}],
      'prospectus': {'approved': true, 'prospectusNumber': '', 'aocNumber': '', 'approvalDate': '2020-05-08', 'expirationDate': null}
    };

    const vendorXoJet = {
      'operatorId': 'b9733070-7de2-435b-9054-b85efe88042f',
      'aircraftOperatorId': 64,
      'name': 'XOJet, Inc.',
      'legalName': 'XOJet, Inc. Aviation',
      'intacctIntegration': {'intacctId': 'V000582'},
      'sapIntegration': {'sapVendorId': null, 'qaSapVendorId': null},
      'argusRating': {'argusRatingId': 'ARGUS_PLATINUM', 'name': 'ARGUS Platinum'},
      'wyvernRating': {'wyvernRatingId': 'WYVERN_WINGMAN', 'name': 'Wyvern Wingman'},
      'isBaoRating': {'isBaoRatingId': 'STAGE_ONE', 'name': 'Stage One'},
      'offFleetPartner': true,
      'automatedSourcingForGuaranteed': true,
      'note': 'very long long long note\n very long long note',
      'cancellationTerms': 'very long long long cancellation terms\n very long long cancellation terms 1',
      'vendorContact': {'firstName': null, 'lastName': null, 'title': null, 'phoneNumber': null, 'email': null},
      'operatorDocuments': [{
        'operatorDocumentId': '5ada9d1f-2bfe-47c8-9d9a-ee25ba55ce08',
        'operatorId': 'b9733070-7de2-435b-9054-b85efe88042f',
        'fileName': 'file_example_GIF_1MB.gif',
        'url': 'https://xo-operator-documents-dev.s3.amazonaws.com/certificate-of-insurance/5ada9d1f-2bfe-47c8-9d9a-ee25ba55ce08.gif',
        'status': 'ACTIVE',
        'docTypeId': 1,
        'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'},
        'activities': [{'status': 'ACTIVE', 'timestamp': 1610486307574, 'user': {'id': 1919, 'firstName': 'Jack', 'lastName': 'Suh'}}]
      }],
      'organization': {'id': 8, 'name': 'XOJET'},
      'serviceAreas': [{'aircraftCategoryId': 4, 'regionIds': [1, 2, 3, 4, 5, 6]}, {
        'aircraftCategoryId': 5,
        'regionIds': [4, 7, 9]
      }, {'aircraftCategoryId': 6, 'regionIds': [1, 2, 3, 4, 5, 6, 7, 8, 9]}],
      'prospectus': {
        'approved': true,
        'prospectusNumber': '1123',
        'aocNumber': '1122',
        'approvalDate': null,
        'expirationDate': '2022-12-19'
      }
    };

  }

  selectDocument(doc) {
    this.showDocument.emit(doc);
  }

}
