
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralStatisticsRoutingModule } from './general-statistics-routing.module';
import { GeneralStatisticsComponent } from './general-statistics.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxEchartsModule } from 'ngx-echarts';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    GeneralStatisticsComponent
  ],
  imports: [
    CommonModule,
    GeneralStatisticsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgxEchartsModule,
    MatSlideToggleModule

  

  ]
})
export class GeneralStatisticsModule { }
