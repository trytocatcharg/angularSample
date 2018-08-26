import { Component, OnInit } from '@angular/core';
import { AppCommon } from '../shared/common'
import { TradesService } from '../services/trade.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  progressVisible=true;
    //Para la progress bar
    color = AppCommon.colorProgressBar();
    mode = AppCommon.modeProgressBar();
  // Pie
  public pieChartLabels:string[] = ['Negativos','Positivos'];
  public pieChartData:number[] = [49,46];
  
  public pieChartType:string = 'pie';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(private tradeService: TradesService){
    this.progressVisible=true;
    let tradeHttpCallComplete= this.tradeService.getSummaryComplete();
    //Uno las 2 peticiones en un solo observable
    //https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs
    forkJoin([tradeHttpCallComplete])
      .subscribe(data => {
              var total=data[0].total;
              var positive=data[0].positive;
              var negative=data[0].negative;
              this.pieChartData=[negative,positive];
              this.progressVisible=false;
            },
      err => console.log("error",err));
  }
  
  ngOnInit() {
  }

}
