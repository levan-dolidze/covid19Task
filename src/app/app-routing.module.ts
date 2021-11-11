import { GeneralStatisticsModule } from './general-statistics/general-statistics.module';
import { GeneralStatisticsComponent } from './general-statistics/general-statistics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'general-statistics',
    pathMatch: 'full'
  },

  {
    path: 'general-statistics',
    loadChildren: () => import('./general-statistics/general-statistics.module').then(m => m.GeneralStatisticsModule)

  },
  {
    path: 'statistics-by-countries',
    loadChildren: () => import('./statistics-by-countries/statistics-by-countries.module').then(m => m.StatisticsByCountriesModule)

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
