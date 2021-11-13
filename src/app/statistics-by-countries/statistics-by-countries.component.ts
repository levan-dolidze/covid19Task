import { FormGroup, FormControl } from '@angular/forms';
import { statisticsByCountriesModel } from './../models/statisticsByCountriesModel';
import { HttpService } from './../services/http.service';

import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-statistics-by-countries',
  templateUrl: './statistics-by-countries.component.html',
  styleUrls: ['./statistics-by-countries.component.css']
})
export class StatisticsByCountriesComponent implements OnInit, OnDestroy {
  statisticsByCountries: Array<statisticsByCountriesModel> = [];
  statisticsByCountriesJSON: any;
  countryNames: Array<any> = [];
  countryNamesJSON: any;
  countryForm: FormGroup;
  countryName: string;
  isSelected: boolean = true;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.createCountryFormInstance();
    this.returnCountryNames();
    this.http.getCountries().subscribe((response) => {
      this.statisticsByCountriesJSON = response
      this.statisticsByCountries = this.statisticsByCountriesJSON.data;
    })

  }

  returnCountryNames() {
    this.http.getCountries().subscribe((response) => {
      this.countryNamesJSON = response;
      this.countryNames = this.countryNamesJSON.data;
      this.statisticsByCountries = this.countryNamesJSON.data;
      console.log(this.statisticsByCountries)
    })
  }

  mapCountryNames() {
    const countryNames = this.countryNames.map((item: any) => {
      return item.name;
    })
    return countryNames

  }
  get countryNameList() {
    return this.mapCountryNames()
  }
  selectedCountryName(e: any) {
    const selectedCountry = e.value;
    this.isSelected = (e.value) ? false : true;

  }

  createCountryFormInstance() {
    this.countryForm = new FormGroup({
      countryName: new FormControl(null)
    })
  }


  ngOnDestroy() {


  }
}
