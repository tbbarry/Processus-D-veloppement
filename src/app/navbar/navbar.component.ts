import { Component } from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {Router} from "@angular/router";
import {NgZone} from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLogged = false;
  fullName: string = "";
   constructor(public  authservice: AuthServiceService, public  router: Router, public zone: NgZone) {
     this.authservice.userConnected$.subscribe((res) => {
       this.isLogged = res;
       console.log(res);
     })
   }
    ngOnInit() {
     this.authservice.userConnected$.subscribe((res) => {
       this.isLogged = res;
       console.log(res);
     })
        this.authservice.userSession.subscribe((res: any) => {
            this.fullName = res;
            console.log(this.fullName);
        });
   }
   logOut() {
     this.authservice.userConnectedSubject.next(false);

     this.zone.run(() => {
        this.router.navigate(["/login"]);
     })
   }

}
