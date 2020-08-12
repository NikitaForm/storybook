import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as models from '../../models';

@Component({
  selector: 'op-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() user: models.User;
  @Output() onSignOut = new EventEmitter<boolean>();
  @Output() onMenuTabOpen = new EventEmitter<boolean>();
  @Output() sidebarToggle = new EventEmitter<boolean>();
  @Input() userName: string;
  @Input() title: string;
  @Input() showSidebar = false;
  @Input() viewPermissions: models.ViewPermissions = null;

  showMenuTab = false;

  signOut(): void {
    this.onSignOut.emit();
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
    this.sidebarToggle.emit(this.showSidebar);
  }

  toggleMenuTab(): void {
    this.showMenuTab = !this.showMenuTab;
    this.onMenuTabOpen.emit(this.showMenuTab);
  }

  getUserHeader(): any {
    return formatString2(this.userName, 'semi-bold');
  }
}

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
