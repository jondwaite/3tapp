import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConnectionService } from 'src/app/shared/connection.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { DriverdetailComponent } from 'src/app/modules/driverdetail/driverdetail.component';
import { DriversComponent } from 'src/app/modules/drivers/drivers.component';
import { CircuitsComponent } from 'src/app/modules/circuits/circuits.component';
import { ConstructorsComponent } from 'src/app/modules/constructors/constructors.component';
import { RacesComponent } from 'src/app/modules/races/races.component';
import { ResultsComponent} from 'src/app/modules/results/results.component';
import { StatusComponent } from 'src/app/modules/status/status.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DefaultComponent,
    DriverdetailComponent,
    DriversComponent,
    CircuitsComponent,
    ConstructorsComponent,
    RacesComponent,
    ResultsComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    ConnectionService
  ]
})
export class DefaultModule { }
