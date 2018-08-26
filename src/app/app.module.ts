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


@NgModule({
  declarations: [
    AppComponent,
    WeekPipe,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpModule
  ],
  providers: [ConfigValues,AppCommon,TradesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
