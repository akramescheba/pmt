import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {AppService} from '../../services/app.service';
import {AuthService } from '../../auth/auth.service'


@Component({
  selector: 'app-historiques',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FontAwesomeModule],
  templateUrl: './historiques.component.html',
  styleUrl: './historiques.component.css',
  providers: [AppService, AuthService]
})
export class HistoriquesComponent implements OnInit {
  faTrash=faTrash;
  projectHistory:any[]=[];

  constructor(
    private appService: AppService,
    private authService: AuthService) { }

  // Récupération du nom de l'utilisateur pour affichage dans les historiques
    // userHistoryNom = this.authService.getNom();

    // Initialisation de la méthode de récupération des historiques depuis la base des données
  ngOnInit(){
    this.loadHistory()
  }
    // Méthode de récupération des historiques depuis la base des données
  loadHistory(){
    this.appService.getHistory().subscribe((history) => {
      this.projectHistory = history;
    })
  }
    // Méthode de suppression des données des historiques depuis la base des données
  deleteHistory(id:number){
    this.appService.deleteHistory(id).subscribe((response) => {
      this.loadHistory();
    })
  }
}
