import { Injectable } from "@angular/core";
import {Http } from '@angular/http';
import {Response, Headers, RequestOptions} from '@angular/http'
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { AppCommon } from '../shared/common'

@Injectable()
export class TradesService{
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


    getSummaryWeek(date:string):Observable<any>{
        let headers = new Headers({'Content-type': 'application/json'});

        let options = new RequestOptions({headers: headers});
        console.log(`${AppCommon.urlAPI}/api/trade/getByWeek/${date}`);
        return this.http.get(`${AppCommon.urlAPI}/api/trade/getByWeek/${date}`,options)
                    .map(this.mappData)
                    .catch(this.handlerError);
    }

}
    