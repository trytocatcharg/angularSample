import { Injectable } from "@angular/core";
import {Http } from '@angular/http';
import {Response, Headers, RequestOptions} from '@angular/http'
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { AppCommon } from '../shared/common'

@Injectable()
export class ConfigValues{
    
    handlerError(error: any) {
        console.log(error);
        return Observable.throw(error.statusText);
    }
    mappData(res: Response) {
        let body= res.json();
        //console.log(body[0]);
        return body;
    }
    constructor(private http: Http){

    }

    getAllValues():Observable<any>{
        let headers = new Headers({'Content-type': 'application/json'});
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({headers: headers});
        return this.http.get(`${AppCommon.urlAPI}/api/config/list`,options)
                    .map(this.mappData)
                    .catch(this.handlerError);
    }

    getValue(name):Observable<any>{
        let headers = new Headers({'Content-type': 'application/json'});
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({headers: headers});
        return this.http.get(`${AppCommon.urlAPI}/api/config/getByName/${name}`,options)
                    .map(this.mappData)
                    .catch(this.handlerError);
    }
}