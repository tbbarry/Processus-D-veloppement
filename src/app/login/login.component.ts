import { Component } from '@angular/core';
import {User} from "../entity/user";
import {AuthServiceService} from "../services/auth-service.service";
import {Router} from "@angular/router";
import {NgZone} from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = new User("", "", "", "", "");

  constructor(public authService: AuthServiceService, public  router: Router, public zone: NgZone) { }

  ngOnInit() {
    (window as any).handleCredentialResponse = this.handleCredentialResponse.bind(this);

  }

  handleCredentialResponse(response: any) {
      // decodeJwtResponse() is a custom function defined by you
      // to decode the credential response.
      console.log(response);

      const responsePayload: any = jwt_decode(response.credential);
      this.user.email = responsePayload.email;
      this.user.tokenID = responsePayload.sub;
      this.user.firstName = responsePayload.given_name;
      this.user.lastName = responsePayload.family_name;
      this.user.fullName = responsePayload.name;
      this.authService.userConnectedSubject.next(true);
      this.authService.userSessionSubject.next(this.user.fullName);
      console.log(this.user);
      this.zone.run(() => {
        this.router.navigate(["/home"]);
      })

    }

}
