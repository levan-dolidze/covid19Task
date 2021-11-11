import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsByCountriesComponent } from './statistics-by-countries.component';

const routes: Routes = [{ path: '', component: StatisticsByCountriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsByCountriesRoutingModule { }
