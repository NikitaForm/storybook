import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'profile-page',
  templateUrl: `./profile-page.component.html`,
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent {

  documentDialogVisible = false;
  document;

  constructor() {
  }

  onShowDocument(doc) {
    this.documentDialogVisible = true;
    this.document = doc;
  }

  closeDocumentDialog() {
    this.documentDialogVisible = false;
    this.document = null;
  }

}
