import { Component, Input } from '@angular/core';

@Component({
  selector: 'version-history',
  templateUrl: './version-history.component.html'
})
export class VersionHistoryComponent {
  @Input() releaseList: Array<VersionHistory>;
}

export interface VersionHistory {
  version: string;
  date: Date;
  newFeatures: Array<VersionHistoryLineItem>;
  bugFixes: Array<VersionHistoryLineItem>;
}

export interface VersionHistoryLineItem {
  feature: string;
  description: string;
}
