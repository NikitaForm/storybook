import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';

import * as moduleDirectives from './directives';



@NgModule({
  declarations: [
    moduleDirectives.PopoverContentComponent,
    moduleDirectives.ValidationTooltipDirective,
    moduleDirectives.InfiniteScrollDirective,
  ],
  exports: [
    moduleDirectives.PopoverContentComponent,
    moduleDirectives.ValidationTooltipDirective,
    moduleDirectives.InfiniteScrollDirective,
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    RouterModule
  ],
  providers: [
  ],
  entryComponents: [moduleDirectives.PopoverContentComponent]
})
export class SharedModule {
}
