import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { animate, query, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss'],
  animations: [
    trigger('slideAnimation', [
      state('false', style({ transform: 'translateX(100%)' })),
      state('true', style({ transform: 'translateX(0)' })),
      transition('void => *', animate(0)),
      transition('* => *', animate('300ms ease'))
    ])
  ]
})
export class SidepanelComponent {
  @Input() toggle = false;
  @Input() width = '50%';
  @Output() toggleChange = new EventEmitter<boolean>();
  private paneWidthStyle: string;

  outside(): void {
    this.toggleChange.emit(false);
  }
}
