import { Injectable } from '@angular/core';
import {map, Observable, Subject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetService {

  constructor(public  http: HttpClient) { }
  public getData(): Observable<any> {
    let sheetno = "0"
    let sheetid = "1QBsiZOOH-PoN48SRiQ8NbZclalhYVJ_9mepxARroLBg"
    const url = 'https://sheets.googleapis.com/v4/spreadsheets/'+sheetid+ '?key=AIzaSyA-ZOBsuijsNNMVlOju9-bh-KctqGa-wjw&includeGridData=true';

    return this.http.get(url);

  }
}
