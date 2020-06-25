import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent {
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() text: string;

  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}
