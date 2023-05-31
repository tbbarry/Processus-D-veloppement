import {Component, NgZone} from '@angular/core';
import {Programme} from "../entity/programme";
import {AuthServiceService} from "../services/auth-service.service";
import {HttpClient} from "@angular/common/http";
import {GoogleSheetService} from "../services/google-sheet.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent {
  coach = {
    nom: 'Dupont',
    prenom: 'Jean',
    description: 'Je suis un coach professionnel spécialisé en développement personnel.',
    photoUrl: 'https://example.com/jean-dupont.jpg',
    siteWeb: 'https://example.com/jean-dupont',
    publicite: 'Contactez-moi dès maintenant pour révéler votre potentiel !',
    email: 'jean.dupont@example.com'
  };

  constructor(public authService: AuthServiceService, public httpClient: HttpClient, public googleService: GoogleSheetService, public router: Router, public zone: NgZone, public fb: FormBuilder) {
    if (localStorage.getItem("lien")) {
      //this.getProgrammes(localStorage.getItem("lien"))

    }
  }

  getProgrammes (id: any) {
    this.googleService.getProgrammes(id).subscribe((res) => {
      console.log(res.sheets)
      let rowData1 = res.sheets[3].data[0].rowData;
      console.log(rowData1);
      /*
      for (let i=1; i< rowData1.length; i++) {
        let values = rowData1[i].values;
        console.log(rowData1[i]);
       // this.programmes.push(new Programme(values[0].formattedValue, values[1].formattedValue, values[2].formattedValue, values[3].formattedValue));
        //console.log(this.programmes);
      }*/

    });
  }
}
