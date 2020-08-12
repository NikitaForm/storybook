import { Component } from '@angular/core';
import { versions } from './version-history';

@Component({
  selector: 'version-history-page',
  templateUrl: './version-history-page.component.html'
})
export class VersionHistoryPageComponent {
  versions = versions;
}
