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
    totalTrades=0;
    totalTradesNeg=0;
    totalTradesPos=0;
    //Para la progress bar
    color = AppCommon.colorProgressBar();
    mode = AppCommon.modeProgressBar();
  // Pie
  public pieChartLabels:string[] = ['Negativos','Positivos'];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';


  public lineChartData:Array<any> = [
    { data: [330, 600, 260, 700], label: 'Negativos' },
    { data: [120, 455, 100, 340], label: 'Positivos' },
  ];
  public lineChartLabels:Array<any> = ['Ene', 'Feb', 'Mar', 'Apr', 'May', 
                                      'Jun', 'Jul','Ago','Sep','Oct','Nov','Dic'];
  public lineChartType:string = 'line';

 
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
    let tradeHttpCallLineChartData= this.tradeService.getSummaryLineChart(2018);
    //Uno las 2 peticiones en un solo observable
    //https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs
    forkJoin([tradeHttpCallComplete,tradeHttpCallLineChartData])
      .subscribe(data => {
              this.totalTrades=data[0].total;
              this.totalTradesPos=data[0].positive;
              this.totalTradesNeg=data[0].negative;
              this.pieChartData=[this.totalTradesNeg,this.totalTradesPos];
              this.progressVisible=false;

             this.lineChartData=data[1];

            },
      err => console.log("error",err));
  }
  
  ngOnInit() {
  }

}
