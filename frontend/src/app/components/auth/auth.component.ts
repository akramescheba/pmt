import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import {ConnexionComponent} from "../connexion/connexion.component";
import {InscriptionComponent} from '../inscription/inscription.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ConnexionComponent, InscriptionComponent,FontAwesomeModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent  {

  faCog=faCog
  ImgHome="assets/pmt.png"
constructor( private authService: AuthService){}

isSignUp: boolean = false;


// Boutons de switch entre le formulaire de connection et d'inscription.

switchToSignIn() {
  this.isSignUp = !this.isSignUp;
}

switchToSignUp() {
  this.isSignUp = !this.isSignUp;
}

}
