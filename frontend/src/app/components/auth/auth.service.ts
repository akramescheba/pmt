import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private toastr: ToastrService, private router: Router) {}

  isSignUp: boolean = false;


  //Méthodes de connexion
  logIn(): void {
    localStorage.setItem('token', 'loggedIn');
  }
  
  //Méthode pour vérifier qu'un utilisateur est déconnecté.
  logOut(): void {
    localStorage.removeItem('token');
    this.toastr.success('Vous êtes déconnecté');
    this.router.navigate(['/login']);
  }
  getNom(){
    return localStorage.getItem('nom');
  }
  getRole(){
    return localStorage.getItem('role');
  }


// Boutons de switch entre le formulaire de connection et d'inscription.

switchToSignIn() {
  this.isSignUp = !this.isSignUp;
}

switchToSignUp() {
  this.isSignUp = !this.isSignUp;
}

}
