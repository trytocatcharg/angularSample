import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment'; 

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  @Input() dateSelected: string;
  dateFormat: Date;
  @Output() notifyDate: EventEmitter<string>
                        = new EventEmitter<string>();
  constructor() { }


  ngOnInit() {
    this.dateFormat=new Date(this.dateSelected);
  }

  onChange(newDate){
    var value=moment(newDate).format("YYYY-MM-DD");
    this.notifyDate.emit(value.toString());
  }

}
