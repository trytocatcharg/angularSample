import { Component } from '@angular/core';
import { MainModel } from './models/mainModel';
import { ConfigValues } from './services/config.service';
import { AppCommon } from './shared/common'
import { tryParse } from 'selenium-webdriver/http';
import { TradesService } from './services/trade.service';
import * as moment from 'moment'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trytocatch app';
  model;
  dateInitial:string ="2018-06-27";
 

}
