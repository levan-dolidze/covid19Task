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
  styleUrls: ['./general-statistics.component.css', '../ident.css']
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


  //ვქმნით ფორმის ინსტანსს რომელშიც არის თარიღების სელექტი
  createDateForm() {
    this.dataForm = new FormGroup({
      date: new FormControl(null),
      date2: new FormControl(null),
    });

  };
  //ბაზიდან მოგვაქვს timeline დატა
  returnGeneralTimelineData() {
    this.generalTimelineData = this.httpservice.getGlobalTimeline().subscribe((response) => {
      this.generalTimelineJSON.push(response);
      this.datesJSON.push(response)
      this.returnParsedData(this.generalTimelineJSON)
      this.setDefaultDates();

    })
  };

  //მთლიანი timeline დატიდან ამოვიღეთ თარიღები 
  get returnDateList() {
    return this.dates.map((item) => {
      return item.date;
    });
  };
  //ვპარსავთ timeline ბაზას 
  returnParsedData(array: any) {
    for (let index = 0; index < array.length; index++) {
      let parsedData = array[index].data;
      this.generalTimeline = parsedData;
      this.dates = parsedData;
    };
  };
  //ვაბრუნებთ ბაზიდან წამოღებულ მთლიან დატას, იმისთვის რომ დავხატოთ ui ში 
  get parsedData() {

    return this.generalTimeline;
  };

  //იუზერის არჩეული თარიღის მიხედვით ვფილტრავთ მონაცემებს იმისთვის რომ UI ში გვქონდეს შესაბამისი ინფორმაცია .
  returnFiltredData(inputDate: any) {
    this.generalTimelineData = this.httpservice.getGlobalTimeline().subscribe((response) => {
      this.generalTimelineJSON.push(response)
      for (let index = 0; index < this.generalTimelineJSON.length; index++) {
        this.generalTimeline = this.generalTimelineJSON[index].data;

      };
      const filtred = this.generalTimeline.filter((item) => {
 
        return item.date === inputDate;
      })

      this.generalTimeline = filtred;
    })

  };
  //ინიცირებისას ვაყენებთ დეფოლტ მნიშვნელობებს, რომელიც უნდა იყოს მიმდინარე თარიღის ინფორმაცია, , 
  setDefaultDates() {
    var today = new Date();
    let todayParsed = this.pipe.transform(today, 'yyyy-MM-dd')

    let minusDay = today.setDate(today.getDate() - 1);
    let minusToday = this.pipe.transform(minusDay, 'yyyy-MM-dd');

    const filtred = this.generalTimeline.filter((item) => {
      return item.date === todayParsed

    });
    //დატიდან მიმდინარე თარიღის ინფო მოდის 12 საათის დაგვიანებით, ანუ თუ ღამის 12 საათს გადაცდა, კალენდარული დღე არის შემდეგი დღე მაგრამ 
    //დატაში ინფორმაცია ისევ წინა დღის რჩება დილამდე, შესაბამისად იუზერი თუ შევა საიტზე ღამე არ დახვდება დეფოლტ მნიშვნელობა
    //ამიტომ ვეუბნებით რომ ასეთ შემთხვევაში წინა დღის მონაცემები წამოიღოს   
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
  //თარიღის არჩევისას ვისვრით UI დან ივენთს და ვიძაბევთ ორ მეთოდს
  //1 ფილტრავს დატას თარიღის მიხედვით
  //2. აგენერირებს ჩარტს 
  selectedDate(date: any) {
    let transformDate = this.pipe.transform(date.value, 'yyyy-MM-dd');
    this.returnFiltredData(transformDate);
    this.returnValuesForChart();
  }
  //ღილაკზე showchart ზემოქმედებით აჩენს ჩარტს. 
  showChart() {
    this.returnValuesForChart();
  };
  //აგროვებს ინფორმაციას ჩარტისთვის 
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



    this.lineChart(allConfirmedReverse, allDeathsReverse, AllRecoveredReverse, allDate, this._lineChartOptions);





  };
  //ატრიალებს დატას  თარიღების სწორი მიმართულებით.
  reverseDate(dateArray: Array<string>) {
    let revercedDateArray = [];
    revercedDateArray = dateArray.reverse();
  };

  // აკეთებს ჩარტს  ,ვიყენებ enchart დან ჩარტის ფორმას ობიექტს, და ვავსებ მას უკვე გამზადებული ველიუებით
  lineChart(confirmedArr: any, deathsArr: any, recoveredArr: any, dateArr: any, lineChartObj: any) {
  
console.log( confirmedArr)
console.log(deathsArr)
console.log(recoveredArr)


  this._lineChartOptions = {
    title: {
      text: 'Current date Statistics',
    },
    
    legend: {
      data: ['Confirmed', 'Recovered', 'Deaths']
    },
    grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
    tooltip: {
    },
    xAxis: {
      data: dateArr,
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: 'Confirmed',
      type: 'line',
      data: confirmedArr,
    },
    {
      name: 'Recovered',
      type: 'line',
      data: recoveredArr,
    },
    {
      name: 'Deaths',
      type: 'line',
      data: deathsArr,
    },
    ]
  };












    // this._lineChartOptions = {
    //   title: {
    //     text: 'Current date Statistics'
    //   },
    //   tooltip: {
    //     trigger: 'axis'
    //   },
    //   legend: {
    //     data: ['confirmed', 'recovered', 'deaths']
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '5%',
    //     containLabel: true
    //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {}
    //     }
    //   },
    //   xAxis: {
    //     type: 'category',
    //     boundaryGap: false,
    //     data: dateArr
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [

    //     {
    //       name: 'confirmed',
    //       type: 'line',
    //       stack: 'Total',
    //       data: confirmedArr
    //     },
    //     {
    //       name: 'recovered',
    //       type: 'line',
    //       stack: 'Total',
    //       data: recoveredArr
    //     },
    //     {
    //       name: 'deaths',
    //       type: 'line',
    //       stack: 'Total',
    //       data: deathsArr
    //     }
    //   ]
    // };



  };

  ngOnDestroy() {
    this.generalTimelineData.unsubscribe();
  };


}
