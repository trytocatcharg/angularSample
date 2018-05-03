import { Component } from '@angular/core';
import { MainModel } from '../models/mainModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trytocatch app';
  model = new MainModel("Prueba");
}
