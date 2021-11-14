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
  newRecovered: Array<any> = []
  newRecoveredJSON: Array<any> = [];
  dates: any

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.createCountryFormInstance();
    this.returnCountryNames();
    this.returnTodayRecovered()
    this.returnData()

  }
  createCountryFormInstance() {
    this.countryForm = new FormGroup({
      countryName: new FormControl(null)
    })
  }
  returnData() {
    this.http.getCountries().subscribe((response) => {
      this.statisticsByCountriesJSON = response
      this.statisticsByCountries = this.statisticsByCountriesJSON.data;
    })
  }

  returnCountryNames() {
    this.http.getCountries().subscribe((response) => {
      this.countryNamesJSON = response;
      this.countryNames = this.countryNamesJSON.data;


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
    this.returnFiltredData(selectedCountry)
    this.isSelected = (e.value) ? false : true;
 

  }
  returnFiltredData(inputData: any) {
    this.http.getCountries().subscribe((response) => {
      this.statisticsByCountriesJSON = response
      this.statisticsByCountries = this.statisticsByCountriesJSON.data;

      const filtred = this.statisticsByCountries.filter((item) => {
        return item.name === inputData;
      })

      this.statisticsByCountries = filtred

    })

  }


  returnTodayRecovered() {
    this.http.getGlobalTimeline().subscribe((response) => {
      this.newRecoveredJSON.push(response)
      this.findNewRecovered(this.newRecoveredJSON)

    })
  }

  findNewRecovered(array: any) {
    for (let index = 0; index < array.length; index++) {
      this.dates = array[index].data;

    }

  }

  get newRecoveredList() {
    return this.dates.map((item: any) => {
      return item.new_recovered
    })
  }

  get gg() {
    console.log(typeof this.countryNamesJSON.data)
    return this.newRecoveredList
  }

  ngOnDestroy() {


  }
}
