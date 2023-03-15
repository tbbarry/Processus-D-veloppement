import { Component } from '@angular/core';
declare const gapi: any;
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PD';
  user = new SocialUser();
  loggedIn = false;

  constructor(private  authService: SocialAuthService, private http: HttpClient) {
  }
  ngOnInit() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '657403735836-b6um1ucm1dsi975esd5e7vlr3n00g2lp.apps.googleusercontent.com'
      });
    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user);
    });

    (window as any).handleCredentialResponse = this.handleCredentialResponse.bind(this);
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  handleCredentialResponse(response: any) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    console.log(response);
    /*
    const responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    */
  }

  onSignIn() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
      console.log('Logged in as:', profile.getName());
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.http.post('/api/login', { token: userData.idToken }).subscribe((response) => {
        //this.cookieService.set('access_token', response['access_token']);
      });
    });
  }

}
