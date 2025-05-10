import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";


@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit{

  constructor(    private router: Router){}
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

}
