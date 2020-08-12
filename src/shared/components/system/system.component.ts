import { Component, Input, ViewEncapsulation } from '@angular/core';
import { EnvironmentEnum } from '../../../environments/environment.interface';
declare var pg: any;
@Component({
  selector: 'system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SystemComponent {
  @Input() version: string;
  @Input() environment: EnvironmentEnum;

  layoutType = 'headerBelow';
  viewOpen = false;

  closeView() {
    this.viewOpen = false;
  }

  toggleView() {
    this.viewOpen = (this.viewOpen === true ? false : true);
  }

  headerBelow() {
    pg.removeClass(document.body, 'menu-behind');
    this.layoutType = 'headerBelow';
  }
  headerTop() {
    pg.addClass(document.body, 'menu-behind');
    this.layoutType = 'headerTop';
  }
}
