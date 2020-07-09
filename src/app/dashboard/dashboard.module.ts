import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';

import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [DashboardComponent,EditModalComponent],
  entryComponents:[EditModalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
