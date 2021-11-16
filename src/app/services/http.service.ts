import { statisticsByCountriesModel } from './../models/statisticsByCountriesModel';
import { generalStatisticsModel } from './../models/generalStatisticsModel';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  globalTimeline_url = environment.globalTimeline;
  countries_url = environment.countries;
  constructor(private http: HttpClient) { }


  getGlobalTimeline(): Observable<Array<generalStatisticsModel>> {
    return this.http.get<Array<generalStatisticsModel>>(this.globalTimeline_url);
  };

  getCountries():Observable<Array<statisticsByCountriesModel>> {
    return this.http.get<Array<statisticsByCountriesModel>>(this.countries_url);
  };

  getCoutriesByCode(countryInicial: statisticsByCountriesModel): Observable<Array<statisticsByCountriesModel>> {
    return this.http.get<Array<statisticsByCountriesModel>>(`${this.countries_url}/${countryInicial}`);
  };
};
