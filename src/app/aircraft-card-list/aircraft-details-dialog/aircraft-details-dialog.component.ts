import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';

@Component({
  selector: 'aircraft-details-dialog',
  templateUrl: './aircraft-details-dialog.component.html',
  styleUrls: ['./aircraft-details-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AircraftDetailsDialogComponent implements OnInit {
  @Input() aircraft;
  @Output() removeImage = new EventEmitter();
  @Output() close = new EventEmitter()

  categoryList = [{
    id: 4,
    name: 'Light Jet'
  }, {
    id: 6,
    name: 'Super Mid Size Jet'
  }];
  modelList = [{
    id: 48,
    name: 'Citation CJ2'
  }, {
    id: 98,
    name: 'Gulfstream G200'
  }, {
    'id': 34,
    'name': 'Challenger 300'
  }, {
    'id': 182,
    'name': 'Citation Latitude'
  }, {
    'id': 60,
    'name': 'Citation Ultra'
  }, {
    'id': 64,
    'name': 'Citation X'
  }

  ];

  amenityList = [
    {
      'id': '8',
      'name': 'Smoking Allowed',
      'visible': true,
      checked: false
    }, {
      'id': '2',
      'name': 'Wi-Fi Available',
      'visible': true,
      checked: false
    }, {
      'id': '7',
      'name': 'Pets Allowed',
      'visible': true,
      checked: false
    }, {
      'id': '6',
      'name': 'Coffee Machine',
      'visible': true,
      checked: false
    }, {
      'id': '4',
      'name': 'Lavatory',
      'visible': true,
      checked: false
    }, {
      'id': '3',
      'name': 'Microwave Oven',
      'visible': true,
      checked: false
    }, {
      'id': '5',
      'name': 'Wi-Fi Complimentary',
      'visible': true,
      checked: false
    }, {
      'id': '1',
      'name': 'Flight Attendant Available',
      'visible': true,
      checked: false
    }, {
      'id': '21',
      'name': 'Cabin Sound System',
      'visible': true,
      checked: false
    }, {
      'id': '22',
      'name': 'Leather Club Seats',
      'visible': true,
      checked: false
    }, {
      'id': '23',
      'name': 'Plush 3-seater Divan',
      'visible': true,
      checked: false
    }, {
      'id': '24',
      'name': 'High-definition TV Screens',
      'visible': true,
      checked: false
    }, {
      'id': '25',
      'name': 'Complimentary snacks, beverages, etc',
      'visible': true,
      checked: false
    }, {
      'id': '26',
      'name': 'AirShow',
      'visible': true,
      checked: false
    }, {
      'id': '27',
      'name': 'Cabin Server',
      'visible': true,
      checked: false
    }, {
      'id': '28',
      'name': 'Power Outlet',
      'visible': true,
      checked: false
    }
  ];
  categoryDescription = 'Category';
  tailNumberDescription = 'Tail Number';
  modelDescription = 'Model';
  maxPaxDescription = 'Max Pax';
  shuttleMaxPaxDescription = 'Shuttle Max Pax';
  homeBaseDescription = 'Home Base Description';
  yorDescription = 'Year of Renovation';
  yomDescription = 'Year of Manufacture';
  amenitiesDescription = 'Amenities';
  costPerHourDescription = 'Approved By';
  expiration = 'Insurance Expiration';
  form: FormGroup;

  exteriorImages: any[];
  interiorImages: any[];
  floorPlanImages: any[];
  disabled = true;

  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '$',
    suffix: ''
  });

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      tailNumber: new FormControl({value: null, disabled: this.disabled}, Validators.required),
      categoryId: new FormControl({value: null, disabled: this.disabled}, Validators.required),
      modelId: new FormControl({value: null, disabled: this.disabled}, Validators.required),
      maxPax: new FormControl(null),
      homeBase: new FormControl(null),
      yor: new FormControl(null),
      yom: new FormControl({value: null, disabled: this.disabled}, Validators.required),
      amenities: new FormControl(null),
      wyvernRated: new FormControl(false),
      argSafetyRating: new FormControl(null),
      liabilityInsurance: new FormControl(null),
      approvedBy: new FormControl(null),
      insuranceExpirationDate: new FormControl(null),
      requiresOwnerApproval: new FormControl(null)
    });
    if (this.aircraft) {
      const aircraftPatched = Object.assign({}, this.aircraft);
      aircraftPatched.yor = this.aircraft.yor ? new Date(this.aircraft.yor.toString()) : null;
      aircraftPatched.yom = this.aircraft.yom ? new Date(this.aircraft.yom.toString()) : null;
      aircraftPatched.insuranceExpirationDate = new Date(this.aircraft.insuranceExpirationDate);
      this.form.patchValue(aircraftPatched);
      this.updateAmenities();
      this.sortImagesByType();
      this.form.disable();
    }
  }

  onCategoryChanged(e) {
  }

  onModelChanged(e) {
  }

  onClick(datePicker) {
    if (!datePicker.isOpen) {
      datePicker.toggle(true);
    }
  }

  remove(upload, image) {
    console.log(upload, image);
  }

  onRemoveImage(image) {
    this.aircraft.images = this.aircraft.images.filter(i => i.url !== image.url);
    this.sortImagesByType();
  }

  sortImagesByType() {
    this.exteriorImages = this.aircraft.images.filter(image => image.type === 'EXTERIOR');
    this.interiorImages = this.aircraft.images.filter(image => image.type === 'INTERIOR');
    this.floorPlanImages = this.aircraft.images.filter(image => image.type === 'FLOORPLAN');
  }

  updateAmenities() {
    // this.amenityList.forEach(
    //   a => a.checked = !!(this.aircraft.amenities.filter(a1 => a1.id === a.id)).length);

    this.amenityList = this.aircraft.amenities;
  }

  closeDialog() {
    this.close.emit();
  }
}
