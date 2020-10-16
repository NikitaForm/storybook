import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { BsDropdownModule } from 'ngx-bootstrap';

import { PagesModule } from '../assets/pages/components/pages.module';
import { pgTabsModule } from '../assets/pages/components/tabs/tabs.module';

import * as moduleComponents from './components';
import * as moduleContainers from './containers';
import * as moduleEffects from './effects';
import * as moduleGuards from './guards';
import * as moduleResolvers from './resolvers';
import * as moduleServices from './services';
import * as operatorServiceContract from './services/operator/contracts/operator';
import * as moduleDirectives from './directives';

import { environment } from '../environments/environment';
import { EnvironmentEnum } from '../environments/environment.interface';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    moduleComponents.ComingSoonComponent,
    moduleComponents.AppComponent,
    moduleComponents.HeaderComponent,
    moduleComponents.AppSidebarComponent,
    moduleComponents.PdfComponent,
    moduleComponents.UserAgreementComponent,
    moduleComponents.FooterComponent,
    moduleComponents.ConfirmationDialogComponent,
    moduleComponents.PdfComponent,
    moduleComponents.TermsAndConditionsComponent,
    moduleComponents.SafetyRequirementsComponent,
    moduleContainers.LandingComponent,
    moduleContainers.AccessDeniedPageComponent,
    moduleContainers.NotFoundPageComponent,
    moduleContainers.UserAgreementPageComponent,
    moduleContainers.DebugComponent,
    moduleDirectives.ClickOutsideDirective
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    FormsModule,
    PagesModule,
    pgTabsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    // EffectsModule.forRoot([moduleEffects.UserEffects])
  ],
  providers: [
    moduleGuards.UserAgreementGuard,
    moduleResolvers.UserAgreementResolver,
    {
      provide: operatorServiceContract.SERVICE_TOKEN,
      useClass: environment.environment !== EnvironmentEnum.LOCAL ? moduleServices.OperatorService :
        moduleServices.OperatorMockService
    },
  ],
  exports: [
    moduleComponents.ComingSoonComponent,
    moduleComponents.ConfirmationDialogComponent,
    moduleComponents.PdfComponent,
    moduleComponents.TermsAndConditionsComponent,
    moduleComponents.SafetyRequirementsComponent,
  ]
})
export class CoreModule {
}
