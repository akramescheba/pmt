import { Component, OnInit } from "@angular/core";
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AddProjectComponent } from "./add-project/add-project.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { AppService } from "../../services/app.service";
import { AuthService } from "../../auth/auth.service";
import { ToastrService } from "ngx-toastr";
import { TachesComponent } from "../../pages/taches/taches.component";
import { HistoriquesComponent } from "../../pages/historiques/historiques.component";
import { ListeTachesComponent } from "../../pages/liste-taches/liste-taches.component";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AddProjectComponent,
    AddUserComponent,
    AddUserComponent,
    TachesComponent,
    ListeTachesComponent,
    HistoriquesComponent,
    DashboardComponent,
  ],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.css",
  providers: [AuthService, AppService],
})
export class AdminComponent implements OnInit {
  faUser = faUser;
  pageActive: string = "dashboard";
  isAddProjectOpen: boolean = false;
  isButton: boolean = false;
  isDisplayHistorique: boolean = false;
  isDisplayTaches: boolean = true;
  //Récupération du nom de l'utilisateur connecté depuis le LocalStorage.
  userNom = this.authService.getNom();

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private appService: AppService
  ) {}
  projects: any[] = [];
  ngOnInit() {
    this.appService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }
}
