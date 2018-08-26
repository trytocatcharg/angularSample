import { Component, OnInit, Input } from '@angular/core';
import { ConfigValues } from '../services/config.service';
import { AppCommon } from '../shared/common'
import { tryParse } from 'selenium-webdriver/http';
import { TradesService } from '../services/trade.service';
import * as moment from 'moment'; 
import { AppComponent } from '../app.component';
import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  weekSelected: number;
  objetiveWeek: number; //el numero ideal que se busca en la semana
  maxOperationByWeek: number; //el numero maximo de operaciones que puedo hacer x semana
  currentObjetiveWeek: number; //el numero real que se gana en la semana
  countOperative: number; //cantidad de operativas que hice en la semana
  today: number = Date.now();
  todayDate: any = Date.now();
  @Input() dateInputWeek: string; //la fecha con que tiene que llenar el summary, viene de afuera del componente.

 constructor(private configValues: ConfigValues, private tradeService: TradesService){

  }

  ngOnInit() {
    this.weekSelected = AppCommon.getWeekNumber(new Date(this.dateInputWeek));
    this.configValues.getAllValues()
    .subscribe(
      data => {
              console.log("success json",data);
              this.objetiveWeek=data.find(s => s.name === AppCommon.OBJ_SEMANAL).value;
              this.maxOperationByWeek=data.find(s => s.name === AppCommon.MOS).value;
              //this.model= new MainModel(data.value);
            },
      err => console.log("error",err)
      );
     
    //TODO debe ser la fecha del dia o sacada de un calendario
  var dateFormatted=moment(this.dateInputWeek).format("YYYY-MM-DD"); //fecha formateada
   
  this.tradeService.getSummaryWeek(dateFormatted)
      .subscribe(
        data => {
                // console.log("success getSummaryWeek json",data);
                this.currentObjetiveWeek=data.point;
                this.countOperative=data.countOperative;
                },
        err => console.log("error",err)
        );
  }

}
