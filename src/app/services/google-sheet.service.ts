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
  public updateData(lien: string, cell: string, value: string): Observable<any> {
     let accessToken = localStorage.getItem("Token");
     const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    let spreadsheetId = "1QBsiZOOH-PoN48SRiQ8NbZclalhYVJ_9mepxARroLBg";
    let range = "A1";
    let url2 = "https://sheets.googleapis.com/v4/spreadsheets/1QBsiZOOH-PoN48SRiQ8NbZclalhYVJ_9mepxARroLBg/values/A1?valueInputOption=RAW&key=AIzaSyA-ZOBsuijsNNMVlOju9-bh-KctqGa-wjw"
    let url = "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}?key=AIzaSyA-ZOBsuijsNNMVlOju9-bh-KctqGa-wjw"
    let sheetno = "0"
    const values = {
      "range": "A1",
        "values": [
      [
        "Barry"
      ]
    ],
        "majorDimension": "ROWS"
    }
   // const url = 'https://sheets.googleapis.com/v4/spreadsheets/'+lien+ '/values/' +cell+ '?key=AIzaSyA-ZOBsuijsNNMVlOju9-bh-KctqGa-wjw';

    return this.http.put(url2,values, {headers});

  }
}
