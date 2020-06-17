import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AircraftListComponent } from './aircraft-list/aircraft-list.component';

const routes: Routes = [{
  path: 'aircrafts',
  component: AircraftListComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
