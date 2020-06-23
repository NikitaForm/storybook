import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CancelEvent, FileInfo, FileRestrictions, RemoveEvent, SuccessEvent } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageUploadComponent implements OnInit {

  @Input() imageList: any[];
  @Input() zoneId = 'zoneId';
  @Input() title: string;
  @Output() removeImage = new EventEmitter();
  uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
  public myRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png']
  };
  constructor() { }

  ngOnInit() {
  }

  public onUpload(ev: SuccessEvent): void {
    if (this.imageList && ev.files ) {
      ev.files.forEach((file: FileInfo) => {
        if (file.rawFile && !file.validationErrors && ev.operation === 'upload') {
          const reader  = new FileReader();

          reader.onloadend = () => {
            this.imageList.push({...file, url: <string>reader.result});
          };
          reader.readAsDataURL(file.rawFile);
        }
      });
    }
  }

  onRemoveImage(image) {
    this.removeImage.emit(image);
  }

}
