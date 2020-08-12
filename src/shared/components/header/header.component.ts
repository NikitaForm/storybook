import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() applicationName: string;
  @Input() appSwitcherIsVisible: boolean;
  @Input() userName: string;
  @Input() title: string;
  @Output() signOut = new EventEmitter<boolean>();
  @Output() toggleMobileSidebar = new EventEmitter<void>();
  @Output() appSwitcher = new EventEmitter<number>();

  getApplicationHeader(): any {
    return formatString1(this.applicationName, 'semi-bold');
  }

  getUserHeader(): any {
    return formatString2(this.userName, 'semi-bold');
  }

  onSignOut(): void {
    this.signOut.emit();
  }
}

const formatString1 = (value: string, cssClass: string): any => {
  if (!cssClass) {
    throw new Error('Css class is not defined');
  }

  if (!value) {
    return value;
  }

  const words = value.match(/[A-Z][a-z]+/g);

  const regular = words.slice(0, words.length - 1).join(' ');
  const lastWord = words[words.length - 1];

  return `${regular}<span class="${cssClass}">${lastWord}</span>`;
};

const formatString2 = (value: string, cssClass: string): any => {
  if (!cssClass) {
    throw new Error('Css class is not defined');
  }

  if (!value) {
    return value;
  }

  const words = value.split(' ');

  const regular = words.slice(0, words.length - 1).join(' ');
  const lastWord = words[words.length - 1];

  return `${regular} <span class="${cssClass}">${lastWord}</span>`;
};
