import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { CircuitsComponent } from './modules/circuits/circuits.component';
import { DriverdetailComponent } from './modules/driverdetail/driverdetail.component';
import { DriversComponent } from './modules/drivers/drivers.component';
import { RacesComponent } from './modules/races/races.component';
import { ResultsComponent } from './modules/results/results.component';
import { ConstructorsComponent } from './modules/constructors/constructors.component';
import { StatusComponent } from './modules/status/status.component';

const routes: Routes = [
  {
  path: '',
  pathMatch: 'full',
  redirectTo: '/drivers'
  },
  {
  path: '',
  component: DefaultComponent,
  children: [{
    path: 'driverdetail/:id',
    component: DriverdetailComponent
  },
  {
    path: 'drivers',
    component: DriversComponent
  },
  {
    path: 'circuits',
    component: CircuitsComponent
  },
  {
    path: 'constructors',
    component: ConstructorsComponent
  },
  {
    path: 'races',
    component: RacesComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  },
  {
    path: 'statuspage',
    component: StatusComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
