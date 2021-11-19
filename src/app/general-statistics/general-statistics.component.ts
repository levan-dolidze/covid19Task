import { DatePipe } from '@angular/common';
import { generalStatisticsModel } from './../models/generalStatisticsModel';
import { HttpService } from './../services/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.css']
})
export class GeneralStatisticsComponent implements OnInit, OnDestroy {
  generalTimeline: Array<generalStatisticsModel> = [];
  generalTimelineJSON: Array<any> = [];
  generalTimelineData: Subscription;

  dataForm: FormGroup;
  datesJSON: Array<any> = [];
  dates: Array<generalStatisticsModel> = [];
  _lineChartOptions: EChartsOption;
  isChartDarkMode: boolean = false;


  constructor(private httpservice: HttpService, private pipe: DatePipe) { }

  ngOnInit(): void {
    this.createDateForm()
    this.returnGeneralTimelineData();

  };



  createDateForm() {
    this.dataForm = new FormGroup({
      date: new FormControl(null)
    });

  };

  returnGeneralTimelineData() {
    this.generalTimelineData = this.httpservice.getGlobalTimeline().subscribe((response) => {
      this.generalTimelineJSON.push(response);
      this.datesJSON.push(response)
      this.parseDates(this.datesJSON)
      this.returnParsedData(this.generalTimelineJSON)
      this.setDefaultDates();

    })
  };

  parseDates(array: any) {
    for (let index = 0; index < array.length; index++) {
      this.dates = array[index].data

    };

  };

  get returnDateList() {
    return this.dates.map((item) => {
      return item.date;
    });
  };

  returnParsedData(array: any) {
    for (let index = 0; index < array.length; index++) {
      this.generalTimeline = array[index].data

    };
  };

  get parsedData() {

    return this.generalTimeline;
  };

  returnFiltredData(inputDate: string) {
    this.generalTimelineData = this.httpservice.getGlobalTimeline().subscribe((response) => {
      this.generalTimelineJSON.push(response)
      for (let index = 0; index < this.generalTimelineJSON.length; index++) {
        this.generalTimeline = this.generalTimelineJSON[index].data

      };
      const filtred = this.generalTimeline.filter((item) => {
        return item.date === inputDate
      })

      this.generalTimeline = filtred
    })

  };

  setDefaultDates() {
    var today = new Date();
    let todayParsed = this.pipe.transform(today, 'yyyy-MM-dd')
    let minusDay = today.setDate(today.getDate() - 1);
    let minusToday = this.pipe.transform(minusDay, 'yyyy-MM-dd');

    const filtred = this.generalTimeline.filter((item) => {
      return item.date === todayParsed

    });
    if (filtred.length == 0) {
      this.generalTimelineData = this.httpservice.getGlobalTimeline().subscribe((response) => {
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


  };

  selectedDate(date: any) {

    this.returnFiltredData(date.value);
    this.returnValuesForChart();
  }

  showChart() {
    this.returnValuesForChart();
  };

  returnValuesForChart() {

    const allDate = this.dates.map((item) => {
      return item.date;
    });

    this.reverseDate(allDate)
    const allConfirmed = this.dates.map((item) => {
      return item.confirmed;
    });

    let allConfirmedReverse = allConfirmed.reverse();
    const allRecovered = this.dates.map((item) => {
      return item.recovered;
    });
    let AllRecoveredReverse = allRecovered.reverse();

    const allDeaths = this.dates.map((item) => {
      return item.deaths;
    });
    let allDeathsReverse = allDeaths.reverse();
    this.lineChart(allConfirmedReverse, allDeathsReverse, AllRecoveredReverse, allDate, this._lineChartOptions)

  };

  reverseDate(dateArray: Array<string>) {
    let revercedDateArray = [];
    revercedDateArray = dateArray.reverse();
  };
  lineChart(confirmedArr: any, deathsArr: any, recoveredArr: any, dateArr: any, lineChartObj: any) {

    this._lineChartOptions = {
      title: {
        text: 'COVID 19 General Statistics'
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
        data: dateArr
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

  ngOnDestroy() {
    this.generalTimelineData.unsubscribe();



  };


}
