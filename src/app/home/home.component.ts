import { Component } from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {User} from "../entity/user";
import {HttpClient} from "@angular/common/http";
import {GoogleSheetService} from "../services/google-sheet.service";
import {Module} from "../entity/module";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  fullName : string = "Amirou";
  modules: Module[] = [];
  send = false;
  constructor(public authService: AuthServiceService, public httpClient: HttpClient, public googleService: GoogleSheetService) {

  }
  getModules () {

  }

}
