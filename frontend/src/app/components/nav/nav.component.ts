import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers: [],
})
export class NavComponent {
  ImgLogo = 'assets/pmt.gif';

  constructor(private router: Router, private auth: AuthService) {}

  userRole: string | null = '';
  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
  }

  onClickMonCompte() {
    if (this.userRole == 'Administrateur') {
      this.router.navigate(['/admin']);
    } else if (this.userRole == 'Membre') {
      this.router.navigate(['/membre']);
    } else if (this.userRole == 'Observateur') {
      this.router.navigate(['/observateur']);
    } else {
      console.error("Une erreur s'est produite");
    }
  }

  loggedOut() {
    this.auth.logOut();
  }
}
