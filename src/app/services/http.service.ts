import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  globalTimeline_url = environment.globalTimeline;
  countries_url = environment.countries;
  constructor(private http: HttpClient) { }


  getGlobalTimeline() {
    return this.http.get(this.globalTimeline_url)
  }

  getCountries() {
    return this.http.get(this.countries_url)
  }
}
