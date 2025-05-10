import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-liste-taches',
  standalone: true,
  imports: [HttpClientModule, CommonModule,FontAwesomeModule],
  templateUrl: './liste-taches.component.html',
  styleUrl: './liste-taches.component.css'
})
export class ListeTachesComponent {

  faCoffee=faCoffee
  taskList:any[]=[];

  constructor(private http : HttpClient, private appService : AppService){};
  
  getTaskList():void{
    this.appService.getTasks().subscribe(data =>{
      this.taskList = data;
    }
    );
  }
  ngOnInit():void{
    this.getTaskList();

  }

}
