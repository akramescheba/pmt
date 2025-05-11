import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {HistoriquesComponent} from '../../pages/historiques/historiques.component';
import {ListeTachesComponent} from '../../pages/liste-taches/liste-taches.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-observateur',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, HttpClientModule, DashboardComponent, HistoriquesComponent, ListeTachesComponent],
  templateUrl: './observateur.component.html',
  styleUrl: './observateur.component.css',
  providers: [],
})
export class ObservateurComponent implements OnInit {

  faUser = faUser;
  selectedProject: any =null
  projectList: any[] = [];
  isDisplayButton: boolean = false;
  pageActive:string='dashboard';
  constructor(
    private http: HttpClient,
    private appService: AppService,
    private authService: AuthService
  ) {}
  // Methode permettant d'afficher les ou decativer des boutons 
  onClickVoirHistorique() {
    this.appService.onClickVoirHistorique()
  }
  cancelButton() {
    this.isDisplayButton = !this.isDisplayButton;
  }
  //Récupération du nom de l'utilisateur connecté depuis le LocalStorage.
  userNom = this.authService.getNom();
  userRole = this.authService.getRole();
  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.appService.getProjects().subscribe(
      (result) => (this.projectList = result),
      (error) => console.error(error)
    );
  }
  selectProject(project: any){
    this.selectedProject={...project};
  }
}
