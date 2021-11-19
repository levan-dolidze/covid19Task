import { Subscription } from 'rxjs';
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

  countryForm: FormGroup;

  countryCode: string;
  isSelected: boolean = true;
  viewMode = 'ShowAllTimeChart';

  _linechartOptions: EChartsOption;
  _barChartOptions: EChartsOption;
  _Last3MonthLinechartOptions: EChartsOption;
  _Last3MonthbarChartOptions: EChartsOption;
  IstimeRangeSelectShow: boolean = true;
  countryCodeDest: Subscription;

  responseData: Array<any> = [];

  constructor(private http: HttpService) { }


  ngOnInit(): void {
    this.createCountryFormInstance();
    this.returnData();

  }
  createCountryFormInstance() {
    this.countryForm = new FormGroup({
      countryCode: new FormControl(null)
    });
  };


  returnData() {
    this.countryCodeDest = this.http.getCountries().subscribe((response) => {
      this.statisticsByCountriesJSON = response;
      this.countryCodsArr = this.statisticsByCountriesJSON.data;

    }, error => {
      alert("unexpected error");
      console.log(error)
    });
  };


  mapCountryCodes() {
    const countryCode = this.countryCodsArr.map((item: any) => {
      return item.code;
    })

    const sortedCountryCode = countryCode.sort((a: any, b: any) => {
      if (a > b) {
        return 1
      }
      else if (a < b) {
        return -1
      } else {
        return 0
      }
    })

    return sortedCountryCode
  };
  get returnCountryCodeList() {
    return this.mapCountryCodes();
  };


  returnFiltredData(inputData: any) {
    this.countryCodeDest = this.http.getCoutriesByCode(inputData).subscribe((response) => {
      this.responseData = [];
      this.responseData.push(response)
      this.returnValuesForChart(inputData, this.responseData);
    });

  };


  selectCountryCodes(e: any) {
    this.timeRangeSelect();
    const selectedCountry = e.value;
    this.returnFiltredData(selectedCountry);
    this.isSelected = (e.value) ? false : true;
  };


  returnValuesForChart(selectedCountry: any, responseChart: any) {
    let filtredArr = [];
    for (let index = 0; index < responseChart.length; index++) {
      filtredArr = (responseChart[index].data.timeline);
    };

    this.reverseDate(filtredArr)

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
    const last3Month = filtredArr.slice(-90);


    let mapConfirmedLast3Month = last3Month.map((item: any) => {
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
  };

  reverseDate(dateArray: Array<string>) {
    let revercedDateArray = [];
    revercedDateArray = dateArray.reverse();
  };

  lineChart(confirmedArr: any, deathsArr: any, recoveredArr: any, allDateArr: any) {


    this._linechartOptions = {
      title: {
        text: 'Total Statiscit By Country (All Time)'
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



  };


  barChart(newConfirmedArr: any, newDeathsArr: any, newRecoveredArr: any, dateArr: any) {

    this._barChartOptions = {
      title: {
        text: 'Per Day(All Time)'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['confirmed', 'deaths', 'recovered']
      },
      xAxis: [
        {
          type: 'category',
          data: dateArr,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',

          min: 0,
          interval: 500,
          axisLabel: {
            formatter: '{value}'
          }

        }

      ],
      series: [
        {
          name: 'new confirmed',
          type: 'bar',
          data: newConfirmedArr
        },
        {
          name: 'new recovered',
          type: 'bar',
          data: newRecoveredArr
        },
        {
          name: 'new deaths',
          type: 'bar',
          data: newDeathsArr
        },

      ]
    }
  };

  lineChartLast3Month(confirmedArr: any, deathsArr: any, recoveredArr: any, allDateArr: any) {
    this._Last3MonthLinechartOptions = {
      title: {
        text: 'Total Statiscit By Country (3 Month)'
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
  };

  barChartLast3Month(newConfirmedArr: any, newDeathsArr: any, newRecoveredArr: any, dateArr: any) {
    this._Last3MonthbarChartOptions = {
      title: {
        text: 'Per Day (3 Month)'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['confirmed', 'deaths', 'recovered']
      },
      xAxis: [
        {
          type: 'category',
          data: dateArr,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',

          min: 0,
          interval: 500,
          axisLabel: {
            formatter: '{value}'
          }
        }

      ],
      series: [
        {
          name: 'new confirmed',
          type: 'bar',
          data: newConfirmedArr
        },
        {
          name: 'new recovered',
          type: 'bar',
          data: newRecoveredArr
        },
        {
          name: 'new deaths',
          type: 'bar',
          data: newDeathsArr
        },

      ]
    }



  };
  timeRangeSelect() {
    return {changeTimeRange:this.IstimeRangeSelectShow = false};
  };


  ngOnDestroy() {
    this.countryCodeDest.unsubscribe();


  };
}


