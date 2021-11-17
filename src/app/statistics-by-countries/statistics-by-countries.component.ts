import { EChartsOption } from 'echarts';
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
  countryCodsArr: Array<string> = [];

  countryCodeJSON: any;
  countryCodesData: Array<string> = []
  countryForm: FormGroup;
  countryName: string;
  countryCode: string;
  isSelected: boolean = true;
  viewMode = 'ShowAllTimeChart';
  _linechartOptions: EChartsOption;
  _barChartOptions: EChartsOption;
  _Last3MonthLinechartOptions: EChartsOption;
  _Last3MonthbarChartOptions: EChartsOption;
  IstimeRangeSelectShow: boolean = true;


  responseData: Array<any> = [];

  constructor(private http: HttpService) { }


  ngOnInit(): void {
    this.createCountryFormInstance();
    this.returnData();

  }
  createCountryFormInstance() {
    this.countryForm = new FormGroup({
      countryName: new FormControl(null),
      countryCode: new FormControl(null)
    })
  }
  returnByCountryName(country?: any) {

    this.http.getCoutriesByCode(country).subscribe((response) => {
      this.countryCodeJSON = response;
      this.countryCodesData = this.countryCodeJSON
    })
  }

  returnData() {
    this.http.getCountries().subscribe((response) => {
      this.statisticsByCountriesJSON = response
      this.countryCodsArr = this.statisticsByCountriesJSON.data;

    })
  }


  mapCountryCodes() {
    const countryCode = this.countryCodsArr.map((item: any) => {
      return item.code;
    })

    return countryCode
  }
  get countryCodeList() {
    return this.mapCountryCodes()
  }


  returnFiltredData(inputData: any) {
    this.http.getCoutriesByCode(inputData).subscribe((response) => {
      this.responseData = [];
      this.responseData.push(response)
  
      this.returnValuesForCart(inputData, this.responseData)
    });

  };






  selectCountryCodes(e: any) {
    this.timeRangeSelect()
    const selectedCountry = e.value;
    this.returnFiltredData(selectedCountry)
    this.isSelected = (e.value) ? false : true;
    this.returnByCountryName(selectedCountry)

  };



  returnValuesForCart(selectedCountry: any, responseChart: any) {
    let filtredArr = [];
    for (let index = 0; index < responseChart.length; index++) {
      filtredArr = (responseChart[index].data.timeline);   
    };


    let mapConfirmed = filtredArr.map((item: any) => {
      return item.confirmed;
    });

    let mapDeaths = filtredArr.map((item: any) => {
      return item.deaths;
    });

    let mapRecovered = filtredArr.map((item: any) => {
      return item.recovered;
    });
    let mapAllDate = filtredArr.map((item: any) => {
      return item.date;
    });

    let mapNewConfirmed = filtredArr.map((item: any) => {
      return item.new_confirmed;
    });
    let mapNewDeaths = filtredArr.map((item: any) => {
      return item.new_deaths;
    });
    let mapNewRecovered = filtredArr.map((item: any) => {
      return item.new_recovered;
    });
    const last3Month = []
    for (let index = 0; index <= 90; index++) {
      last3Month.push(filtredArr[index]);

    };

    let mapConfirmedLast3Month = last3Month.map((item:any ) => {
      return item.confirmed;
    });
 
    let mapDeathsLast3Month = last3Month.map((item: any) => {
      return item.deaths;
    });
    let mapRecoveredLast3Month = last3Month.map((item: any) => {
      return item.recovered;
    });
    let mapLast3MonthDate = last3Month.map((item: any) => {
      return item.date;
    });


    let mapNewConfirmedLast3Mont = last3Month.map((item: any) => {
      return item.new_confirmed;
    });
    let mapNewDeathsLast3Mont = last3Month.map((item: any) => {
      return item.new_deaths
    });
    let mapNewRecoveredLast3Mont = last3Month.map((item: any) => {
      return item.new_recovered;
    });



    this.lineChart(mapConfirmed, mapDeaths, mapRecovered, mapAllDate);
    this.barChart(mapNewConfirmed, mapNewDeaths, mapNewRecovered, mapAllDate);

    this.lineChartLast3Month(mapConfirmedLast3Month, mapDeathsLast3Month, mapRecoveredLast3Month, mapLast3MonthDate);
    this.barChartLast3Month(mapNewConfirmedLast3Mont, mapNewDeathsLast3Mont, mapNewRecoveredLast3Mont, mapLast3MonthDate);
  }
  lineChart(confirmedArr: any, deathsArr: any, recoveredArr: any, allDateArr: any) {


    this._linechartOptions = {
      title: {
        text: 'COVID 19 Total Statiscit By Country (ALL TIME)'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['confirmed', 'recovered', 'deaths']
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: allDateArr
      },
      yAxis: {
        type: 'value'
      },
      series: [

        {
          name: 'confirmed',
          type: 'line',
          stack: 'Total',
          data: confirmedArr
        },
        {
          name: 'recovered',
          type: 'line',
          stack: 'Total',
          data: recoveredArr
        },
        {
          name: 'deaths',
          type: 'line',
          stack: 'Total',
          data: deathsArr
        }
      ]
    };



  }


  barChart(newConfirmedArr: any, newDeathsArr: any, newRecoveredArr: any, dateArr: any) {

    this._barChartOptions = {
      title: {
        text: 'COVID 19 Daily Statiscit By Country (ALL TIME)'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: dateArr
      },
      series: [
        {
          name: 'new confirmed',
          type: 'bar',
          data: newConfirmedArr
        },
        {
          name: 'new deaths',
          type: 'bar',
          data: newDeathsArr
        },
        {
          name: 'new recovered',
          type: 'bar',
          data: newRecoveredArr
        }
      ]
    }
  }

  lineChartLast3Month(confirmedArr: any, deathsArr: any, recoveredArr: any, allDateArr: any) {
    this._Last3MonthLinechartOptions = {
      title: {
        text: 'COVID 19 Total Statiscit By Country (LAST 3 MONTH)'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['confirmed', 'recovered', 'deaths']
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: allDateArr
      },
      yAxis: {
        type: 'value'
      },
      series: [

        {
          name: 'confirmed',
          type: 'line',
          stack: 'Total',
          data: confirmedArr
        },
        {
          name: 'recovered',
          type: 'line',
          stack: 'Total',
          data: recoveredArr
        },
        {
          name: 'deaths',
          type: 'line',
          stack: 'Total',
          data: deathsArr
        }
      ]
    };
  }

  barChartLast3Month(newConfirmedArr: any, newDeathsArr: any, newRecoveredArr: any, dateArr: any) {
    this._Last3MonthbarChartOptions = {
      title: {
        text: 'COVID 19 Daily Statiscit By Country (LAST 3 MONTH)'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: dateArr
      },
      series: [
        {
          name: 'new confirmed',
          type: 'bar',
          data: newConfirmedArr
        },
        {
          name: 'new deaths',
          type: 'bar',
          data: newDeathsArr
        },
        {
          name: 'new recovered',
          type: 'bar',
          data: newRecoveredArr
        }
      ]
    }
  }

  timeRangeSelect() {
    this.IstimeRangeSelectShow = false;
  }

  ngOnDestroy() {


  }
}
