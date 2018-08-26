import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { WeekPipe } from './pipes/week.pipe';
import { ConfigValues } from './services/config.service';
import { HttpModule } from '@angular/http';
import { AppCommon } from './shared/common';
import { TradesService } from './services/trade.service';
import { SummaryComponent } from './summary/summary.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateComponent } from './date/date.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts'
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    WeekPipe,
    SummaryComponent,
    DateComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ChartsModule
    
    
  ],
  providers: [ConfigValues,AppCommon,TradesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
