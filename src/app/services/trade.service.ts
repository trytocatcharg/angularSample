import { Injectable } from "@angular/core";
import {Http } from '@angular/http';
import {Response, Headers, RequestOptions} from '@angular/http'
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { AppCommon } from '../shared/common';
import * as moment from 'moment'; 

@Injectable()
export class TradesService{
    mappDataComplete(res: Response): any {
        let body= res.json();
        let positive = 0;
        let negative = 0;
        
        body.forEach(element => {
                if(element.result=='OK'){
                positive=positive+1;
                }else{
                    negative=negative+1;
                }
        });
        var newJson={total:Object.keys(body).length,positive:positive,negative:negative};
        return newJson;
       
    }

    mappDataLineChart(res: Response): any {
        let body= res.json();
        let positive = 0;
        let negative = 0;
        
       

        let listMonth = [1,2,3,4,5,6,7,8,9,10,11,2];
        let janPositive=0,febPositive=0,marPositive=0,abrPositive=0,mayPositive=0,junPositive=0,julPositive=0,
            agPositive=0,sepPositive=0,octPositive=0,novPositive=0,dicPositive=0;
        let janNegative=0,febNegative=0,marNegative=0,abrNegative=0,mayNegative=0,junNegative=0,
            julNegative=0,agNegative=0,sepNegative=0,octNegative=0,novNegative=0,dicNegative=0;
                body.forEach(element => {
                    var dateFormatted=moment(element.dateTrade, 'DD/MM/YYYY').format("MM/DD/YYYY");
                    var d = new Date(dateFormatted);
                    if(d.getMonth()==1){
                        if(element.result=='OK'){
                            janPositive=janPositive+1;
                        }else{
                            janNegative=janNegative+1;
                        }
                    }
                    if(d.getMonth()==2){
                        if(element.result=='OK'){
                            febPositive=febPositive+1;
                        }else{
                            febNegative=febNegative+1;
                        }
                    }
                    if(d.getMonth()==3){
                        if(element.result=='OK'){
                            marPositive=marPositive+1;
                        }else{
                            marNegative=marNegative+1;
                        }
                    }
                    if(d.getMonth()==4){
                        if(element.result=='OK'){
                            abrPositive=abrPositive+1;
                        }else{
                            abrNegative=abrNegative+1;
                        }
                    }
                    if(d.getMonth()==5){
                        if(element.result=='OK'){
                            mayPositive=mayPositive+1;
                        }else{
                            mayNegative=mayNegative+1;
                        }
                    }
                    if(d.getMonth()==6){
                        if(element.result=='OK'){
                            junPositive=junPositive+1;
                        }else{
                            junNegative=junNegative+1;
                        }
                    }
                    if(d.getMonth()==7){
                        if(element.result=='OK'){
                            julPositive=julPositive+1;
                        }else{
                            julNegative=julNegative+1;
                        }
                    }
                    if(d.getMonth()==8){
                        if(element.result=='OK'){
                            agPositive=agPositive+1;
                        }else{
                            agNegative=agNegative+1;
                        }
                    }
                    if(d.getMonth()==9){
                        if(element.result=='OK'){
                            sepPositive=sepPositive+1;
                        }else{
                            sepNegative=sepNegative+1;
                        }
                    }
                    if(d.getMonth()==10){
                        if(element.result=='OK'){
                            octPositive=octPositive+1;
                        }else{
                            octNegative=octNegative+1;
                        }
                    }
                    if(d.getMonth()==11){
                        if(element.result=='OK'){
                            novPositive=novPositive+1;
                        }else{
                            novNegative=novNegative+1;
                        }
                    }
                    if(d.getMonth()==12){
                        if(element.result=='OK'){
                            dicPositive=dicPositive+1;
                        }else{
                            dicNegative=dicNegative+1;
                        }
                    }

            });
         //Ejemplo de json
        //330 es enero, 600 es febrero, 260 es marzo, 700 abril y asi...
        // { data: [330, 600, 260, 700], label: 'Negativos' },
        // { data: [120, 455, 100, 340], label: 'Positivos' },
        var arrayData:Array<any> = [
            { data: [janNegative,febNegative,marNegative,abrNegative,mayNegative,junNegative,
                julNegative,agNegative,sepNegative,octNegative,novNegative,dicNegative], label: 'Negativos' },
            { data: [janPositive,febPositive,marPositive,abrPositive,mayPositive,junPositive,
                julPositive,agPositive,sepPositive,octPositive,novPositive,dicPositive], label: 'Positivos' },
          ];
        return arrayData;
       
    }

    handlerError(error: any) {
        console.log(error);
        return Observable.throw(error.statusText);
    }
    mappData(res: Response) {
        let body= res.json();
        console.log(body[0]);
        let pointResult=0;
        var countOperative=0;
        body.forEach(element => {
            var resultOperation=element.priceIn -element.priceOut;
            countOperative=countOperative+1;
            console.log(resultOperation);
            if(element.operation_type=='BUY'
                     && resultOperation>0){
                    //si entre en largo y el resultado fue > 0, la operacion fue fallida
                    pointResult=pointResult-resultOperation;
            }
            else if(element.operation_type=='BUY'
                    && resultOperation<0){
                        //si entre en largo y el resultado fue < 0, la operacion fue EXITOSA
                        pointResult=pointResult+(resultOperation*-1);
                    }
            else if(element.operation_type=='SELL'
                    && resultOperation>0){
                        //si entre en corto y el resultado fue > 0, la operacion fue EXITOSA
                        pointResult=pointResult+resultOperation;
                    }
            else if(element.operation_type=='SELL'
                    && resultOperation<0){
                        //si entre en corto y el resultado fue < 0, la operacion fue fallida
                        pointResult=pointResult-resultOperation;
                    }
        });
        var newJson={point:pointResult, countOperative:countOperative};
        return newJson;
    }
    constructor(private http: Http){

    }

    getSummaryLineChart(year:number):Observable<any>{
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(`${AppCommon.urlAPI}/api/trade/`,options)
                    .map(this.mappDataLineChart)
                    .catch(this.handlerError);
        // return this.http.get(`${AppCommon.urlAPI}/api/trade/getByYear/${year}`,options)
        //             .map(this.mappDataLineChart)
        //             .catch(this.handlerError);
    }
    //Obtiene el resumen total de los trades
    getSummaryComplete():Observable<any>{
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(`${AppCommon.urlAPI}/api/trade/`,options)
                    .map(this.mappDataComplete)
                    .catch(this.handlerError);
    }


   getSummaryWeek(date:string):Observable<any>{
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        console.log(`${AppCommon.urlAPI}/api/trade/getByWeek/${date}`);
        return this.http.get(`${AppCommon.urlAPI}/api/trade/getByWeek/${date}`,options)
                    .map(this.mappData)
                    .catch(this.handlerError);
    }

}
    