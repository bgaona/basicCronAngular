import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { PingComponent } from './components/ping/ping.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SchedulerComponent, PingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SchedulerRoutingModule,
  ]
})
export class SchedulerModule { }
