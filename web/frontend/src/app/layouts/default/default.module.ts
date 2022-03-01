import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { DriversComponent } from 'src/app/modules/drivers/drivers.component';
import { CircuitsComponent } from 'src/app/modules/circuits/circuits.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    DefaultComponent,
    DriversComponent,
    CircuitsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule
  ]
})
export class DefaultModule { }
