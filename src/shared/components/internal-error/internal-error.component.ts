import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-internal-error',
  templateUrl: './internal-error.component.html'
})
export class InternalErrorComponent {
  @Input() errorText: string;
}
