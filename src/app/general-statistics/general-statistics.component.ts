import { generalStatisticsModel } from './../models/generalStatisticsModel';

import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.css']
})
export class GeneralStatisticsComponent implements OnInit {
  generalTimeline: generalStatisticsModel;
  test: any
  constructor(private httpservice: HttpService) { }

  ngOnInit(): void {

    this.httpservice.getGlobalTimeline().subscribe((data) => {
      this.test.push(data)
      for (let index = 0; index < this.test.length; index++) {
        this.generalTimeline = this.test[index].data[index]

      }

      console.log(this.generalTimeline)
    })



    this.generalTimeline = {
      active: 7878,
      confirmed: 7878,
      date: '7878',
      deaths: 7878,
      new_confirmed: 7878,
      new_deaths: 7878,
      new_recovered: 7878,
      recovered: 7878,
      updated_at: '4545',
    }

    console.log(this.generalTimeline)
  }


}



