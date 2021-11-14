import { RoundNumberPipe } from './../pipes/round-number.pipe';

import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsByCountriesRoutingModule } from './statistics-by-countries-routing.module';
import { StatisticsByCountriesComponent } from './statistics-by-countries.component';


@NgModule({
  declarations: [
    StatisticsByCountriesComponent,
    RoundNumberPipe


  ],
  imports: [
    CommonModule,
    StatisticsByCountriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,


   
  ]
})
export class StatisticsByCountriesModule { }
