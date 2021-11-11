import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralStatisticsRoutingModule } from './general-statistics-routing.module';
import { GeneralStatisticsComponent } from './general-statistics.component';


@NgModule({
  declarations: [
    GeneralStatisticsComponent
  ],
  imports: [
    CommonModule,
    GeneralStatisticsRoutingModule
  ]
})
export class GeneralStatisticsModule { }
