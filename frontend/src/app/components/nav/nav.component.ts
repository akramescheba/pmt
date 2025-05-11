import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import {AppService} from '../services/app.service';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-nav",
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.css",
  providers: [],
})
export class NavComponent {
  ImgLogo = "assets/pmt.jpg";
  faUser = faUser;
  constructor(private router: Router, private auth: AuthService) {}

  userRole: string | null = "";
  ngOnInit(): void {
    this.userRole = localStorage.getItem("role");
  }

  onClickMonCompte() {
    if (this.userRole == "Administrateur") {
      this.router.navigate(["/admin"]);
    } else if (this.userRole == "Membre") {
      this.router.navigate(["/membre"]);
    } else if (this.userRole == "Observateur") {
      this.router.navigate(["/observateur"]);
    } else {
      console.error("Une erreur s'est produite");
    }
  }

  loggedOut() {
    this.auth.logOut();
  }
}
