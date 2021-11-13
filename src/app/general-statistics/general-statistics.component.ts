import { DatePipe } from '@angular/common';
import { generalStatisticsModel } from './../models/generalStatisticsModel';

import { HttpService } from './../services/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


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

  constructor(private httpservice: HttpService, private pipe: DatePipe) { }

  ngOnInit(): void {
    this.createDatesInstance()
    this.returnGeneralTimelineData()

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
      this.parseDate(this.datesJSON)
      this.returnParsedData(this.generalTimelineJSON)
      this.setDefaultValues();

    })
  }

  parseDate(array: any) {
    for (let index = 0; index < array.length; index++) {
      this.dates = array[index].data

    }

  }

  get parsedDates() {
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

    return this.generalTimeline
  }

  chouse(e: any) {

    this.returnFiltredData(e.value)

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

  setDefaultValues() {
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

}


