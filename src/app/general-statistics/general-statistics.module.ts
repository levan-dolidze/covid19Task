import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralStatisticsRoutingModule } from './general-statistics-routing.module';
import { GeneralStatisticsComponent } from './general-statistics.component';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxEchartsModule } from 'ngx-echarts';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    GeneralStatisticsComponent
  ],
  imports: [
    CommonModule,
    GeneralStatisticsRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgxEchartsModule,
    MatButtonModule

  

  ]
})
export class GeneralStatisticsModule { }
