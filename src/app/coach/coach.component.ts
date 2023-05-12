import { Component } from '@angular/core';

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
}
