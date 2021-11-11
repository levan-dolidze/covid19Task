import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsByCountriesRoutingModule } from './statistics-by-countries-routing.module';
import { StatisticsByCountriesComponent } from './statistics-by-countries.component';


@NgModule({
  declarations: [
    StatisticsByCountriesComponent
  ],
  imports: [
    CommonModule,
    StatisticsByCountriesRoutingModule
  ]
})
export class StatisticsByCountriesModule { }
