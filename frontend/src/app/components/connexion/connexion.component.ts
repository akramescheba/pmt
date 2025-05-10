import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthComponent } from '../auth/auth.component';
import { AppService } from '../services/app.service';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

interface usersDataList {
  id: number;
  nom: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
  providers: [AppService, AuthService],
})
export class ConnexionComponent implements OnInit {
  email: string = '';
  psw: string = '';
  usersList: usersDataList[] = [];
  loginForm!: FormGroup;
  isSignUp: boolean = false;

  constructor(
    private authService: AuthService,
    private authComponent: AuthComponent,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  switchToSignUp() {
    this.authComponent.switchToSignUp();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      psw: ['', Validators.required],
    });
  }

  seConnecter() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const psw = this.loginForm.get('psw')?.value;

      this.appService.getUsers().subscribe((response: usersDataList[]) => {
        this.usersList = response;

        const user = this.usersList.find((u) => u.email === email);

        if (user) {
          if (user.password === psw) {
            this.authService.logIn();
            localStorage.setItem('nom', user.nom);
            localStorage.setItem('role', user.role);
            this.toastr.success(`Connecté en tant que ${user.nom}`);
            if (user.role === 'Administrateur') {
              this.router.navigate(['/admin']);
            } else if(user.role==='Membre'){
              this.router.navigate(['/membre']);
            }
            else if(user.role==='Observateur'){
              this.router.navigate(['/observateur']);
            }
            else{
              this.toastr.error('Erreur de connexion');
            }

          } else {
            this.toastr.error('Mot de passe incorrect !');
          }
        } else {
          this.toastr.warning('Email non trouvé ou erroné !');
        }
      });
    } else {
      this.toastr.warning('Veuillez remplir tous les champs.');
    }
  }
}
