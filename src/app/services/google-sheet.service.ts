import { Injectable } from '@angular/core';
import {map, Observable, Subject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetService {

  constructor(public  http: HttpClient) { }
  public getData(lien: string): Observable<any> {
    let sheetno = "0"
    const url = 'https://sheets.googleapis.com/v4/spreadsheets/'+lien+ '?key=AIzaSyA-ZOBsuijsNNMVlOju9-bh-KctqGa-wjw&includeGridData=true';

    return this.http.get(url);

  }
  public getProgrammes(lien: string): Observable<any> {
    let sheetno = "0"
    const url = 'https://sheets.googleapis.com/v4/spreadsheets/'+lien+ '?key=AIzaSyA-ZOBsuijsNNMVlOju9-bh-KctqGa-wjw&includeGridData=true';

    return this.http.get(url);

  }
}
