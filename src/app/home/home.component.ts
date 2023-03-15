import { Component } from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {User} from "../entity/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  fullName : string = "Amirou";
  constructor(public authService: AuthServiceService){
    this.authService.userSession.subscribe((res : any) => {
      console.log("utilisateur");
      this.fullName = res;
      console.log(this.fullName);
    })
  }

}
