import { Component } from '@angular/core';
import { MainModel } from './models/mainModel';
import * as moment from 'moment'; 
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trytocatch app';
  model;
  dateInitial:string =moment(Date.now()).format("YYYY-MM-DD");;


  onNotifyDate(date: string): void {
    this.dateInitial=date;
  }

}

