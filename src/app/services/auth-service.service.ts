import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../entity/user";


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public userConnectedSubject = new BehaviorSubject<boolean>(false);
  public userConnected$ = this.userConnectedSubject.asObservable();

  public firstLogindSubject = new BehaviorSubject<boolean>(false);
  public firstLogin$ = this.userConnectedSubject.asObservable();

  public userSessionSubject = new BehaviorSubject<string>("");
  public userSession = this.userSessionSubject.asObservable();
  constructor() { }
}
