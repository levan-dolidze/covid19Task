import { DatePipe } from '@angular/common';
import { generalStatisticsModel } from './../models/generalStatisticsModel';

import { HttpService } from './../services/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';


@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.css']
})
export class GeneralStatisticsComponent implements OnInit, OnDestroy {
  generalTimeline: Array<generalStatisticsModel> = [];
  generalTimelineJSON: Array<any> = [];
  dataForm: FormGroup;
  datesJSON: Array<any> = [];
  dates: Array<generalStatisticsModel> = [];
  _chartOptions: EChartsOption;
  _theme: string;
  isChartDarkMode: boolean = false;

  constructor(private httpservice: HttpService, private pipe: DatePipe) { }

  ngOnInit(): void {
    this.createDatesInstance()
    this.returnGeneralTimelineData();


  }

  ngOnDestroy() {

  }

  createDatesInstance() {
    this.dataForm = new FormGroup({
      date: new FormControl(null)
    });

  };

  returnGeneralTimelineData() {
    this.httpservice.getGlobalTimeline().subscribe((response) => {
      this.generalTimelineJSON.push(response);
      this.datesJSON.push(response)
      this.parseDates(this.datesJSON)
      this.returnParsedData(this.generalTimelineJSON)
      this.setDefaultDates();

    })
  }

  parseDates(array: any) {
    for (let index = 0; index < array.length; index++) {
      this.dates = array[index].data

    }

  }

  get dateList() {
    return this.dates.map((item) => {
      return item.date;
    })
  }

  returnParsedData(array: any) {
    for (let index = 0; index < array.length; index++) {
      this.generalTimeline = array[index].data

    };
  };

  get parsedData() {

    return this.generalTimeline;
  }

  returnFiltredData(inputDate: string) {
    this.httpservice.getGlobalTimeline().subscribe((response) => {
      this.generalTimelineJSON.push(response)
      for (let index = 0; index < this.generalTimelineJSON.length; index++) {
        this.generalTimeline = this.generalTimelineJSON[index].data

      };
      const filtred = this.generalTimeline.filter((item) => {
        return item.date == inputDate
      })

      this.generalTimeline = filtred
    })

  }

  setDefaultDates() {
    var today = new Date();
    let todayParsed = this.pipe.transform(today, 'yyyy-MM-dd')
    let minusDay = today.setDate(today.getDate() - 1);
    let minusToday = this.pipe.transform(minusDay, 'yyyy-MM-dd');

    const filtred = this.generalTimeline.filter((item) => {
      return item.date == todayParsed

    });
    if (filtred.length == 0) {
      this.httpservice.getGlobalTimeline().subscribe((response) => {
        this.generalTimelineJSON.push(response)
      })
      const filtred = this.generalTimeline.filter((item) => {
        return item.date == minusToday
      })
      this.generalTimeline = filtred

    }
    else {
      this.generalTimeline = filtred
    }


  }

  selectedDate(date: any) {

    this.returnFiltredData(date.value)
    this.returnValuesForCart(date.value)
  }



  returnValuesForCart(input: any) {
    const filtreConfirmed = this.dates.filter((item) => {
      return item.date == input
    })

    const mapConfirmed = filtreConfirmed.map((item) => {
      return item.confirmed
    })
    const mapDeaths = filtreConfirmed.map((item) => {
      return item.deaths
    })
    const mapRecovered = filtreConfirmed.map((item) => {
      return item.recovered
    })

    this.dataChart(mapConfirmed, mapDeaths, mapRecovered)
  }



  dataChart(confirmed: any, deaths: any, recovered: any) {
    const confirmedData = JSON.parse(confirmed);
    const deathesData = JSON.parse(deaths);
    const recoveredData = JSON.parse(recovered);
    this._theme = (this.isChartDarkMode) ? 'dark' : ''
    this._chartOptions = {
      xAxis: {
        type: 'category',
        data: ['Confirmed', 'Deaths', 'Recovered']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [confirmedData, deathesData, recoveredData],
          type: 'line'
        }
      ]
    }
  }
  changeChartMode(event: any) {
    console.log(event)
    return { mode: this.isChartDarkMode = !this.isChartDarkMode }


  }
 

}


