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
  usersDialogVisible = false;
  users: any;

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

  onShowUsers(users) {
    this.usersDialogVisible = true;
    this.users = users;
  }

  closeUsersDialog() {
    this.usersDialogVisible = false;
  }

}
