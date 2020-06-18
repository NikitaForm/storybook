import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AircraftListComponent } from './aircraft-list/aircraft-list.component';
import { AircraftFormComponent } from './aircraft-form/aircraft-form.component';

const routes: Routes = [
  {
    path: 'aircrafts',
    component: AircraftListComponent,
  }, {
    path: 'edit/:id',
    component: AircraftFormComponent,
  }, {
    path: '',
    redirectTo: 'aircrafts',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
