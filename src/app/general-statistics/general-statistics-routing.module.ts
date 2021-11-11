import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralStatisticsComponent } from './general-statistics.component';

const routes: Routes = [
  { path: '', component: GeneralStatisticsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralStatisticsRoutingModule { }
