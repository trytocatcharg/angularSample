import { Component, OnInit, Input } from '@angular/core';
import { ConfigValues } from '../services/config.service';
import { AppCommon } from '../shared/common'
import { tryParse } from 'selenium-webdriver/http';
import { TradesService } from '../services/trade.service';
import * as moment from 'moment'; 
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() dateInputWeek: string; //la fecha con que tiene que llenar el summary, viene de afuera del componente.
  weekSelected: number;
  objetiveWeek: number; //el numero ideal que se busca en la semana
  maxOperationByWeek: number; //el numero maximo de operaciones que puedo hacer x semana
  currentObjetiveWeek: number; //el numero real que se gana en la semana
  countOperative: number; //cantidad de operativas que hice en la semana
  dateSelectedDisplay: string;
  isPositive: string="ZERO";
  //Para la progress bar
  color = AppCommon.colorProgressBar();
  mode = AppCommon.modeProgressBar();
  progressVisible=false;
 constructor(private configValues: ConfigValues, private tradeService: TradesService){

  }

  ngOnChanges(){
    console.log("summary.component recibe input()",this.dateInputWeek);
    this.weekSelected = AppCommon.getWeekNumber(new Date(this.dateInputWeek));
    //TODO debe ser la fecha del dia o sacada de un calendario
    var dateFormatted=moment(this.dateInputWeek).format("YYYY-MM-DD"); //fecha formateada
    this.dateSelectedDisplay=moment(this.dateInputWeek).format("DD-MM-YYYY"); //fecha formateada para mostrar en el cuadro de resumen
    this.progressVisible=true;
    let configHttpCall = this.configValues.getAllValues();
    let tradeHttpCall=this.tradeService.getSummaryWeek(dateFormatted);
    let tradeHttpCallComplete= this.tradeService.getSummaryComplete();
    //Uno las 2 peticiones en un solo observable
    //https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs
    forkJoin([configHttpCall, tradeHttpCall,tradeHttpCallComplete])
      .subscribe(data => {
              this.objetiveWeek=data[0].find(s => s.name === AppCommon.OBJ_SEMANAL).value;
              this.maxOperationByWeek=data[0].find(s => s.name === AppCommon.MOS).value;
              
              this.currentObjetiveWeek=data[1].point; //puntos que llevo en la semana que estoy viendo
              if(this.currentObjetiveWeek>0){
                 this.isPositive='YES';
              }else if(this.currentObjetiveWeek<0){
                this.isPositive='NO';
              }else{
                this.isPositive='ZERO';
              }

              this.countOperative=data[1].countOperative; //cantidad de operativas en la semana que estoy viendo
              this.progressVisible=false;



            },
      err => console.log("error",err));
  } 
  ngOnInit() {
    
  }

}
