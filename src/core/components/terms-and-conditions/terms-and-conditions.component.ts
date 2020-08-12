import { Component, Input } from '@angular/core';
import * as coreModels from '../../models';

@Component({
  selector: 'op-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent {
  @Input() dba: coreModels.DBA = coreModels.DBA.JS;

  dbaEnums = coreModels.DBA;
}
