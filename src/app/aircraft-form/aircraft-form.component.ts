import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';

@Component({
  selector: 'app-aircraft-form',
  templateUrl: './aircraft-form.component.html',
  styleUrls: ['./aircraft-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AircraftFormComponent implements OnInit {

  @Input() aircraft;
  @Output() removeImage = new EventEmitter();

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
  }];

  amenityList = [
    {
      'id': '8',
      'name': 'Smoking Allowed',
      'visible': true
    }, {
      'id': '2',
      'name': 'Wi-Fi Available',
      'visible': true
    }, {
      'id': '7',
      'name': 'Pets Allowed',
      'visible': true
    }, {
      'id': '6',
      'name': 'Coffee Machine',
      'visible': true
    }, {
      'id': '4',
      'name': 'Lavatory',
      'visible': true
    }, {
      'id': '3',
      'name': 'Oven',
      'visible': true
    }, {
      'id': '5',
      'name': 'Wi-Fi Complimentary',
      'visible': true
    }, {
      'id': '1',
      'name': 'Flight Attendant Available',
      'visible': true
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
  costPerHourDescription = 'Cost Per Hour';
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
      costPerHour: new FormControl(null)
    });
    if (this.aircraft) {
      this.aircraft.yor = new Date(this.aircraft.yor.toString());
      this.aircraft.yom = new Date(this.aircraft.yom.toString());
      this.form.patchValue(this.aircraft);
      this.sortImagesByType();
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

}
