import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { DriversComponent } from 'src/app/modules/drivers/drivers.component';
import { CircuitsComponent } from 'src/app/modules/circuits/circuits.component';
import { ConstructorsComponent } from 'src/app/modules/constructors/constructors.component';
import { RacesComponent } from 'src/app/modules/races/races.component';
import { ResultsComponent} from 'src/app/modules/results/results.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DefaultComponent,
    DriversComponent,
    CircuitsComponent,
    ConstructorsComponent,
    RacesComponent,
    ResultsComponent,
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
    MatButtonModule
  ]
})
export class DefaultModule { }
